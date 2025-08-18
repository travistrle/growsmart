import React from 'react'
import { Link } from 'react-router-dom'
import backgroundImageUrl from '../../assets/LandingBg.jpg'

const LandingPage: React.FC = () => {
  return (
    // The root element is now h-full and flex
    <div
      className="relative flex-1 w-full flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 z-0"></div>

      {/* Content container */}
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
          Unlock Your Typing Potential
        </h1>
        <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto text-gray-300 drop-shadow-md">
          Master the art of typing with interactive lessons and real-time feedback.
        </p>

        {/* This button now correctly links to the HomePage */}
        <Link
          to="/home"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold text-xl py-4 px-10 rounded-lg shadow-2xl transition-transform transform hover:scale-105 duration-300 ease-in-out"
        >
          Let&apos;s Get Started
        </Link>
      </div>
    </div>
  )
}

export default LandingPage
