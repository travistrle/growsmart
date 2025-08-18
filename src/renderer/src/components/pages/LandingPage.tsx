import React from 'react'
import { Link } from 'react-router-dom'
import backgroundImageUrl from '../../assets/LandingBg.jpg'

const LandingPage: React.FC = () => {
  return (
   
    <div
      className="relative flex-1 w-full flex items-center justify-center overflow-hidden gap-4"
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
    
      <div className="absolute inset-0 z-0"></div>

     
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg p-4">
          Unlock Your Typing Potential
        </h1>
        <p className="text-lg md:text-xl mb-12 max-w-2xl mx-auto text-gray-300 drop-shadow-md p-4">
          Master the art of typing with interactive lessons and real-time feedback.
        </p>


        <Link to="/home" className="inline-block">

  <div className="p-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg">
 
    <div className="bg-white text-xl font-bold text-center py-4 px-10 rounded-md transition-transform transform hover:scale-105 duration-300 ease-in-out">
   
      <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
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
