import { useState, type ReactNode, type ReactElement } from 'react'
import { SoundContext } from './SoundContext'

export function SoundProvider({ children }: { children: ReactNode }): ReactElement {
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(1) // Volume is from 0 to 1

  const toggleMute = (): void => {
    setIsMuted((prev) => !prev)
  }

  const handleSetVolume = (newVolume: number): void => {
    // Ensure volume is within the valid range [0, 1]
    const clampedVolume = Math.max(0, Math.min(1, newVolume))
    setVolume(clampedVolume)
    // Automatically unmute if the volume is turned up
    if (clampedVolume > 0 && isMuted) {
      setIsMuted(false)
    }
  }

  const value = {
    isMuted,
    volume,
    toggleMute,
    setVolume: handleSetVolume
  }

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>
}
