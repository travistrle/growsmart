import React from 'react'
import { GridComponent } from '../GridComponent'

const HomePage: React.FC = () => {
  return (
    <div className="p-8 h-screen w-full flex flex-col items-center">
      <div className="w-full max-w-5xl flex flex-col items-center gap-8">
        <h1 className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text mt-12 mb-4 font-bold text-5xl text-center">
          Master Your Keyboard!
        </h1>
        <p className="text-xl text-center text-gray-600 max-w-2xl">
          Enhance your productivity by improving your typing speed and accuracy. Select a level to
          begin.
        </p>

        <div className="w-full">
          <GridComponent />
        </div>
      </div>
    </div>
  )
}

export default HomePage
