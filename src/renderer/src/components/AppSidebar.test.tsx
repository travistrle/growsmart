import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AppSidebar } from './AppSidebar'
import { describe, it, expect, vi, type Mock, beforeEach } from 'vitest'
import { useSidebar } from '@/components/ui/sidebar-context'

vi.mock('@/components/ui/sidebar-context')
const mockUseSidebar = useSidebar as unknown as Mock
describe('AppSidebar', () => {
  const toggleSidebarMock = vi.fn()
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders correctly when the sidebar is expanded', () => {
    mockUseSidebar.mockReturnValue({
      state: 'expanded',
      toggleSidebar: vi.fn()
    })

    render(<AppSidebar />, {
      wrapper: MemoryRouter
    })

    expect(screen.getByText('GrowSmart')).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
  })

  it('renders correctly and hides text when the sidebar is collapsed', () => {
    mockUseSidebar.mockReturnValue({
      state: 'collapsed',
      toggleSidebar: toggleSidebarMock
    })

    // Act: Render the component
    render(<AppSidebar />, {
      wrapper: MemoryRouter
    })

    // Assert: The title and menu item text should not be in the document
    expect(screen.queryByText('GrowSmart')).not.toBeInTheDocument()
    // The icons should still be there (we can test by their parent button's tooltip/name)
    expect(screen.getByRole('button', { name: 'Home' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'About' })).toBeInTheDocument()
  })
})
