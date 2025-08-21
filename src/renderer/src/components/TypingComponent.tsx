import React, { useState, useEffect, useRef, useMemo } from 'react'
import typeSound from '../assets/typesound.wav'
import { useSound } from '@/hooks/SoundHooks'

interface TypingProps {
  content: string
}

function normalizeNewlines(s: string): string {
  // Convert CRLF and CR to LF to match what browsers produce in <textarea>
  return s.replace(/\r\n?/g, '\n').normalize?.('NFC') ?? s.replace(/\r\n?/g, '\n')
}

export function TypingComponent({ content }: TypingProps): React.ReactElement {
  // ✅ Normalize target text newlines so comparisons match textarea behavior
  const textToType = useMemo(() => normalizeNewlines(content), [content])

  // Keep both raw (what the user actually typed) and normalized (for comparison)
  const [userInputRaw, setUserInputRaw] = useState('')
  const [userInputNorm, setUserInputNorm] = useState('')
  const [startTime, setStartTime] = useState<number | null>(null)
  const [endTime, setEndTime] = useState<number | null>(null)
  const [errors, setErrors] = useState(0)
  const { isMuted, volume } = useSound()

  useEffect(() => {
    if (typeof Audio !== 'undefined') {
      if (!clickSoundRef.current) {
        clickSoundRef.current = new Audio(typeSound)
      }
      clickSoundRef.current.volume = volume
    }
  }, [volume])

  // Compare by Unicode code points to avoid basic surrogate-pair issues
  const targetChars = useMemo(() => Array.from(textToType), [textToType])
  const totalChars = targetChars.length

  const inputRef = useRef<HTMLTextAreaElement>(null)

  const isFinished = userInputNorm.length === totalChars

  const clickSoundRef = useRef<HTMLAudioElement | null>(
    typeof Audio !== 'undefined' ? new Audio(typeSound) : null
  )

  const recompute = (raw: string): void => {
    const norm = normalizeNewlines(raw)
    if (!startTime && norm.length > 0) setStartTime(Date.now())

    let errorCount = 0
    const typedChars = Array.from(norm)
    for (let i = 0; i < typedChars.length; i++) {
      if (typedChars[i] !== targetChars[i]) {
        errorCount++
      }
    }

    setErrors(errorCount)
    setUserInputRaw(raw)
    setUserInputNorm(norm)

    if (typedChars.length === totalChars) {
      setEndTime((prev) => prev ?? Date.now())
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    recompute(e.target.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (!isFinished && !isMuted && clickSoundRef.current) {
      clickSoundRef.current.currentTime = 0
      clickSoundRef.current.play().catch((error) => {
        console.error('Audio playback error:', error)
      })
    }

    if (e.key === 'Tab') {
      e.preventDefault()
      const el = e.currentTarget
      const start = el.selectionStart ?? userInputRaw.length
      const end = el.selectionEnd ?? userInputRaw.length

      const nextRaw = userInputRaw.slice(0, start) + '\t' + userInputRaw.slice(end)
      // Move caret after inserted tab on next tick
      requestAnimationFrame(() => {
        if (inputRef.current) {
          inputRef.current.selectionStart = inputRef.current.selectionEnd = start + 1
        }
      })
      recompute(nextRaw)
    }
  }

  const resetTest = (): void => {
    setUserInputRaw('')
    setUserInputNorm('')
    setStartTime(null)
    setEndTime(null)
    setErrors(0)
    inputRef.current?.focus()
  }

  useEffect(() => {
    if (!isFinished) inputRef.current?.focus()
  }, [isFinished])

  const timeTakenInSeconds = startTime && endTime ? (endTime - startTime) / 1000 : 0
  const correctChars = Math.max(0, userInputNorm.length - errors)
  const accuracy = isFinished && totalChars > 0 ? (correctChars / totalChars) * 100 : 0
  const timeInMinutes = timeTakenInSeconds > 0 ? timeTakenInSeconds / 60 : 0
  const wpm = isFinished && timeInMinutes > 0 ? Math.round(correctChars / 5 / timeInMinutes) : 0

  return (
    <div>
      <div
        className="w-full p-6 max-w-5xl bg-white rounded-lg shadow-md font-mono text-gray-800 whitespace-pre-wrap break-words"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="text-2xl tracking-wider leading-relaxed mb-6">
          {targetChars.map((char, index) => {
            // Make whitespace visible but keep underlying comparison exact
            let displayChar = char
            if (char === ' ') {
              displayChar = '\u00A0' // NBSP
            }
            if (char === '\n') {
              displayChar = '↵' // visible newline glyph
            }
            if (char === '\t') {
              displayChar = '⇥' // visible tab glyph
            }

            let charClass = 'text-gray-400'
            const typedLen = userInputNorm.length

            if (index < typedLen) {
              charClass =
                userInputNorm[index] === targetChars[index]
                  ? 'bg-green-200 text-green-800'
                  : 'bg-red-200 text-red-800'
            }

            if (index === typedLen && !isFinished) {
              charClass += ' animate-pulse border-b-2 border-blue-500'
            }

            return (
              <span key={index} className={charClass}>
                {displayChar}
                {char === '\n' ? '\n' : null}
              </span>
            )
          })}
        </div>
      </div>

      {/* Hidden but focusable textarea to capture every keystroke, including Tab and Enter */}
      <textarea
        ref={inputRef}
        value={userInputRaw}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="sr-only"
        disabled={isFinished}
      />

      {isFinished && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg text-center gap-4">
          <h2 className="text-2xl text-red-500 font-bold mb-2 p-4">Results ✨</h2>
          <div className="flex justify-center text-gray-500 gap-8 p-4">
            <p>
              <strong>WPM:</strong> {wpm}
            </p>
            <p>
              <strong>Time:</strong> {timeTakenInSeconds.toFixed(2)}s
            </p>
            <p>
              <strong>Accuracy:</strong> {accuracy.toFixed(2)}% ({correctChars}/{totalChars})
            </p>
          </div>
          <button
            onClick={resetTest}
            className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors p-4"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  )
}
