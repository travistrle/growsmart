import { useContext } from 'react'
import { ThemeContext, type ThemeContextType } from '../contexts/ThemeContext'

// Create and export a custom hook for easy access to the theme context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
