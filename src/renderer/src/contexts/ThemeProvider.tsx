import { useState, type ReactNode, type ReactElement, useEffect } from 'react'
import { ThemeContext, type Theme } from './ThemeContext'

export function ThemeProvider({
  children,
  defaultTheme = 'light',
  storageKey = 'vite-ui-theme'
}: {
  children: ReactNode
  defaultTheme?: Theme
  storageKey?: string
}): ReactElement {
  const [theme, setTheme] =
    useState<Theme>(() => localStorage.getItem(storageKey) as Theme) || defaultTheme

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove(theme === 'light' ? 'dark' : 'light')
    root.classList.add(theme)
  }, [theme])
  const toggleTheme = (): void => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    localStorage.setItem(storageKey, newTheme)
    setTheme(newTheme)
  }

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      localStorage.setItem(storageKey, newTheme)
      setTheme(newTheme)
    },
    toggleTheme
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
