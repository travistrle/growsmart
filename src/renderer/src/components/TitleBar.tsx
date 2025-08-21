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
const WindowControls = (): ReactElement | null => {
  // These controls should only appear on macOS ('darwin')
  if (window.api.platform !== 'darwin') {
    return null
  }

  const handleMinimize = (): void => window.api.minimizeWindow()
  const handleMaximize = (): void => window.api.toggleMaximizeWindow()
  const handleClose = (): void => window.api.closeWindow()

  return (
    // This container is not draggable
    <div
      className="flex space-x-2 bg-stone-800"
      style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
    >
      <button
        onClick={handleClose}
        className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-600 focus:outline-none"
        aria-label="Close"
      />
      <button
        onClick={handleMinimize}
        className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-600 focus:outline-none"
        aria-label="Minimize"
      />
      <button
        onClick={handleMaximize}
        className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-600 focus:outline-none"
        aria-label="Toggle Maximize"
      />
    </div>
  )
}

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
      className="w-full h-10 bg-gray-200 flex items-center justify-between px-3 select-none"
      style={{ WebkitAppRegion: 'drag' } as React.CSSProperties}
    >
      {/* Left side: Window Controls */}
      <WindowControls />

      {/* Center: Navigation Buttons */}
      <div
        className="flex items-center space-x-2"
        style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}
      >
        <button
          onClick={goBack}
          className="p-1 rounded-md hover:bg-gray-300 transition-colors focus:outline-none"
          aria-label="Go back"
        >
          <ArrowLeft size={18} />
        </button>
        <button
          onClick={goForward}
          className="p-1 rounded-md hover:bg-gray-300 transition-colors focus:outline-none"
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
