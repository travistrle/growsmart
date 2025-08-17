import { render, screen } from '@testing-library/react'
import MainLayout from './MainLayout'
import { describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'

describe('MainLayout Component', () => {
  it('should render Header, Footer, and Outlet', () => {
    render(
      <MemoryRouter>
        <MainLayout />
      </MemoryRouter>
    )

    // Check if Header is rendered
    expect(screen.getByRole('banner')).toBeInTheDocument()

    // Check if Footer is rendered
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()

    // Check if Outlet is rendered (this will depend on the routes set up in your app)
    expect(screen.getByText(/Home/i)).toBeInTheDocument()
  })
})
