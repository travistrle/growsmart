import React from 'react'
import { MyGridComponent } from '../my-grid-component'

const HomePage: React.FC = () => {
  return (
    <div className="flex-1 items-center justify-center flex-1 w-full bg-gray-100 p-5">
      <p className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text p-8 mb-8 font-bold text-4xl">
        Welcome to the GrowSmart Typing App!
      </p>

      <div className="mt-4 text-lg text-gray-700">
        <MyGridComponent />
      </div>
    </div>
  )
}
export default HomePage
