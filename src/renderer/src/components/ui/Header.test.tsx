import { render, screen } from '@testing-library/react'
import Header from './Header'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'

describe('Header Component', () => {
  it('should render the application title', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )
    expect(screen.getByText(/MyApp 🚀/i)).toBeInTheDocument()
  })

  it('should render the navigation links', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )
    const homeLink = screen.getByText(/Home/i)
    const aboutLink = screen.getByText(/About/i)
    expect(homeLink).toBeInTheDocument()
    expect(aboutLink).toBeInTheDocument()
  })
})
