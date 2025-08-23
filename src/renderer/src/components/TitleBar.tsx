// src/renderer/src/components/TitleBar.tsx

import { type ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'

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

// A new component just for the macOS-style window controls
export function TitleBar(): ReactElement {
  const navigate = useNavigate()

  const goBack = (): void => {
    navigate(-1)
  }

  const goForward = (): void => {
    navigate(1)
  }

  return (
    // The entire bar is draggable by default
    <div
      className="w-full h-10 bg-background dark:bg-gray-800 flex justify-end select-none"
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
  )
}
