import { type ReactElement } from 'react'
import { useSound } from '../../hooks/SoundHooks'
import { Volume2, VolumeX } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Sun } from 'lucide-react'
import { useTheme } from '../../hooks/ThemeHook'

export function Settings(): ReactElement {
  const { isMuted, volume, toggleMute, setVolume } = useSound()
  const { theme, toggleTheme } = useTheme()

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setVolume(parseFloat(e.target.value))
  }

  return (
    <div className="flex flex-col items-start p-10 border-2 rounded-md border-shadow shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)] ">
      <div className="flex flex-row w-120 gap-8 p-2">
        <h2 className="flex text-lg items-center justify-center text-slate-500 font-bold">
          Volume
        </h2>
        <div className=" p-2 flex flex-1 items-center justify-center gap-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <button
            onClick={toggleMute}
            className="p-2 rounded-full bg-slate-500 dark:text-gray-400 hover:bg-gray-200 transition-colors focus:outline-none"
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
          <span className="w-12 text-center text-slate-500">
            {Math.round((isMuted ? 0 : volume) * 100)}%
          </span>
        </div>
      </div>
      <div className="flex flex-row w-120 gap-8 p-2">
        <h2 className="flex text-lg items-center justify-center text-slate-500 font-bold">
          Darkmode
        </h2>
        <div className="flex-1 flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="flex items-center space-x-2">
            <Sun className="text-gray-600 dark:text-gray-400" />
            <Label htmlFor="theme-switch" className="text-gray-600 dark:text-gray-300">
              Light / Dark
            </Label>
          </div>

          <Switch
            id="theme-switch"
            checked={theme === 'dark'}
            onCheckedChange={toggleTheme}
            aria-label="Toggle theme"
          />
        </div>
      </div>
    </div>
  )
}
