import { render, screen } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
// Import Routes and Route
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './MainLayout'
import HomePage from '../pages/HomePage'

describe('MainLayout Component', () => {
  // 2. Set up the mock before each test in this file
  beforeEach(() => {
    vi.stubGlobal('api', {
      platform: 'darwin', // You can set this to 'darwin' or 'win32' for your test
      minimizeWindow: () => {},
      toggleMaximizeWindow: () => {},
      closeWindow: () => {}
    })
  })

  it('should render its layout and the correct child route via Outlet', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    )

    // Your assertion should now pass
    expect(screen.getByText(/Master Your Keyboard/i)).toBeInTheDocument()
  })
})
