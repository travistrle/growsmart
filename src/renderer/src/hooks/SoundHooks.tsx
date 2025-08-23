import { useContext } from 'react'
import { SoundContext, type SoundContextType } from '../contexts/SoundContext'

// Create the custom hook for easy consumption of the context
export function useSound(): SoundContextType {
  const context = useContext(SoundContext)
  if (!context || Object.keys(context).length === 0) {
    throw new Error('useSound must be used within a SoundProvider')
  }
  return context
}
