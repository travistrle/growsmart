import React from 'react'
import HomePage from './components/pages/HomePage'
import About from './components/pages/About'
import MainLayout from './components/layout/MainLayout'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/about" element={<About />} />
          {/* Add more routes as needed */}
        </Route>
      </Routes>
    </Router>
  )
}

export default App
