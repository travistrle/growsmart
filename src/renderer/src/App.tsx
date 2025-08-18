import React from 'react'
import HomePage from './components/pages/HomePage'
import About from './components/pages/About'
import MainLayout from './components/layout/MainLayout'
import LandingPage from './components/pages/LandingPage'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import BeginnerTyping from './components/pages/BeginnerTyping'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* The LandingPage is now the default (index) page inside the layout */}
          <Route index element={<LandingPage />} />

          {/* The HomePage is now at a dedicated path */}
          <Route path="home" element={<HomePage />} />
          <Route path="about" element={<About />} />
          <Route path="beginner-typing" element={<BeginnerTyping />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
