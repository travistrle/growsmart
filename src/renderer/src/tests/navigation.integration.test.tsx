import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import App from '../App' // Import the main App component
import { MemoryRouter } from 'react-router-dom'

vi.mock('../components/pages/HomePage', () => {
  return {
    __esModule: true,
    default: () => <div>Mocked Home Page</div>
  }
})

vi.mock('../components/pages/About', () => {
  return {
    __esModule: true,
    default: () => <div>Mocked About Page</div>
  }
})

describe('Navigation Integration Tests', () => {
  it('should render HomePage on root path', async () => {
    const user = userEvent.setup()
    render(<App />)
    expect(screen.getByText(/Mocked Home Page/i)).toBeInTheDocument()

    // Simulate navigation to the About page
    const aboutLink = screen.getByText(/About/i)
    await user.click(aboutLink)

    // Assert navigation was successful
    expect(await screen.findByText(/Mocked About Page/i)).toBeInTheDocument()
  })
})
