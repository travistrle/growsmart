import React from 'react'
import HomePage from './components/pages/HomePage'
import About from './components/pages/About'

import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import TypingInterface from './components/pages/TypingInterface'
import { GridPractices } from './components/pages/GridPractices'
import MainLayout from './components/layout/MainLayout'
import { Settings } from './components/pages/Settings'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<About />} />
          <Route path="/practices/:level" element={<GridPractices />} />
          <Route path="/typing/:level/:practiceId" element={<TypingInterface />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
