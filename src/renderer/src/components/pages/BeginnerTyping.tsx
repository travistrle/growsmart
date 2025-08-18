import React from 'react'
import { TypingTest } from '../TypingTest'

const beginnerContent =
  'The quick brown fox\njumps over the lazy dog.\nI am typing \t\t a funny thing.'

const BeginnerTyping: React.FC = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center w-full bg-gray-100 gap-4">
      <p className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text p-4 font-bold text-4xl">
        Beginner Typing Practice
      </p>
      <TypingTest content={beginnerContent} />
    </div>
  )
}
export default BeginnerTyping
