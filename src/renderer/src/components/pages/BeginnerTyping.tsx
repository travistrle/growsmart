import React from 'react'
import TypingPage from './TypingPage'

const beginnerContent = [
  "The quick brown fox jumps over the lazy dog.",
  "Practice makes perfect.",
  "Keep your fingers on the home row keys: a s d f j k l ;"
];


const BeginnerTyping: React.FC = () => {
  return (
  <TypingPage 
    title="Beginner Typing Practice" 
    content={beginnerContent} 
  />
  )
}
export default BeginnerTyping