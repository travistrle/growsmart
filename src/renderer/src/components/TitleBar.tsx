// src/renderer/src/components/TitleBar.tsx

import { type ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Minus, Square, X } from 'lucide-react'

// Define the type for window.api
declare global {
  interface Window {
    api: {
      platform: string
      minimizeWindow: () => void
      toggleMaximizeWindow: () => void
      closeWindow: () => void
    }
  }
}

const WindowsControls = (): ReactElement | null => {
  if (window.api.platform === 'darwin') return null
  return (
    <div className="flex" style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}>
      <button
        onClick={() => window.api.minimizeWindow()}
        className="px-3 py-2 hover:bg-gray-700 text-white"
      >
        {' '}
        <Minus size={14} />{' '}
      </button>
      <button
        onClick={() => window.api.toggleMaximizeWindow()}
        className="px-3 py-2 hover:bg-gray-700 text-white"
      >
        {' '}
        <Square size={14} />{' '}
      </button>
      <button
        onClick={() => window.api.closeWindow()}
        className="px-3 py-2 hover:bg-red-500 text-white"
      >
        {' '}
        <X size={14} />{' '}
      </button>
    </div>
  )
}

// A new component just for the macOS-style window controls
export function TitleBar(): ReactElement {
  const navigate = useNavigate()

  const goBack = (): void => {
    navigate(-1)
  }

  const goForward = (): void => {
    navigate(1)
  }
  // 1. Check the platform once
  const isMac = window.api.platform === 'darwin'

  // 2. Create a reusable component for the arrows
  const NavigationArrows = (): ReactElement => (
    <div
      style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
      className="flex items-center space-x-2"
    >
      <button
        onClick={goBack}
        className="p-1 rounded-md text-gray-400 hover:bg-slate-200 dark:hover:bg-gray-700"
      >
        <ArrowLeft size={18} />
      </button>
      <button
        onClick={goForward}
        className="p-1 rounded-md text-gray-400 hover:bg-slate-200 dark:hover:bg-gray-700"
      >
        <ArrowRight size={18} />
      </button>
    </div>
  )

  return isMac ? (
    <div
      // 3. Main container now uses justify-between
      className="w-full h-10 bg-[#FAFAFA] dark:bg-[#171717] dark: border-b border-sibebar-border flex items-center justify-end px-3 select-none"
      style={{ WebkitAppRegion: 'drag' } as React.CSSProperties}
    >
      <div
        className="flex items-center space-x-2"
        style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
      >
        <button
          onClick={goBack}
          className="p-1 rounded-md text-gray-400 hover:bg-slate-200 dark:text-gray-400 transition-colors focus:outline-none"
          aria-label="Go back"
        >
          <ArrowLeft size={18} />
        </button>
        <button
          onClick={goForward}
          className="p-1 rounded-md text-gray-400 hover:bg-slate-200 dark:text-gray-400 transition-colors focus:outline-none"
          aria-label="Go forward"
        >
          <ArrowRight size={18} />
        </button>
      </div>

      {/* Right side: Empty spacer to help center the navigation arrows */}
      {/* Adjust width as needed to balance the left controls */}
      <div className="w-16"></div>
    </div>
  ) : (
    <div
      // 3. Main container now uses justify-between
      className="w-full h-10 bg-background dark:bg-gray-800 flex items-center justify-between px-3 select-none"
      style={{ WebkitAppRegion: 'drag' } as React.CSSProperties}
    >
      <NavigationArrows />
      <WindowsControls />
    </div>
  )
}
