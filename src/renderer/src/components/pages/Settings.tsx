// src/renderer/src/components/SettingsPage.tsx

import { type ReactElement } from 'react'
import { useSound } from '../../hooks/SoundHooks'
import { Volume2, VolumeX } from 'lucide-react'

export function Settings(): ReactElement {
  const { isMuted, volume, toggleMute, setVolume } = useSound()

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setVolume(parseFloat(e.target.value))
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-150">
      <h2 className="text-lg text-orange-500 font-bold mb-4">Sound Settings</h2>
      <div className="flex items-center space-x-4 gap-4">
        <button
          onClick={toggleMute}
          className="p-2 rounded-full bg-slate-500  hover:bg-gray-200 transition-colors focus:outline-none"
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted || volume === 0 ? <VolumeX /> : <Volume2 />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={isMuted ? 0 : volume}
          onChange={handleVolumeChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <span className="w-12 text-center">{Math.round((isMuted ? 0 : volume) * 100)}%</span>
      </div>
    </div>
  )
}
