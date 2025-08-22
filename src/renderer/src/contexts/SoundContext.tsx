import { createContext } from 'react'

export interface SoundContextType {
  isMuted: boolean
  volume: number
  toggleMute: () => void
  setVolume: (volume: number) => void
}

// 2. Create and export the context so the hook can use it
export const SoundContext = createContext<SoundContextType | undefined>(undefined)
