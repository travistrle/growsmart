import React from 'react'
import { Link } from 'react-router-dom'

const LandingPage: React.FC = () => {
  return (
    <div
      className="relative flex-1 w-full flex items-center justify-center overflow-hidden gap-4"
      style={{
        backgroundColor: '#FAF8CC', // Fallback color
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 z-0"></div>

      <div className="relative z-10 text-center text-[#5D4037] px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg p-4">
          Unlock Your Typing Potential
        </h1>
        <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto text-[#1A237E] drop-shadow-md p-4">
          Master the art of typing with interactive lessons and real-time feedback.
        </p>

        <Link to="/home" className="inline-block group">
          <div className="p-1 bg-amber-500 rounded-lg transition duration-300 ease-in-out group-hover:bg-amber-600">
            <div className="bg-white text-xl font-bold text-center py-4 px-10 rounded-md transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-lg">
              <span className="bg-blue-600 text-transparent bg-clip-text group-hover:text-blue-700 transition-colors duration-300">
                Let&apos;s Get Started
              </span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default LandingPage
