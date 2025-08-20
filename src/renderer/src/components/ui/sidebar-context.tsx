import { useContext, createContext } from 'react'

export type SidebarContextProps = {
  state: 'expanded' | 'collapsed'
  open: boolean
  setOpen: (open: boolean) => void
  toggleSidebar: () => void
}

export const SidebarContext = createContext<SidebarContextProps | null>(null)

export function useSidebar(): SidebarContextProps {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}
