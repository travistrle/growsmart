import { Home, Inbox, PanelLeftClose } from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'
import { useSidebar } from '@/components/ui/sidebar-context'
import { type ReactElement } from 'react'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger
} from '@/components/ui/sidebar'

const items = [
  {
    title: 'Home',
    url: '/',
    icon: Home
  },
  {
    title: 'About',
    url: '/about',
    icon: Inbox
  }
]

export function AppSidebar(): ReactElement {
  const { state, toggleSidebar } = useSidebar()
  const location = useLocation()
  const activeRoute = location.pathname

  const handleMenuClick = (url: string): void => {
    if (state === 'collapsed') {
      toggleSidebar()
    } else if (state === 'expanded' && activeRoute === url) {
      toggleSidebar()
    }
  }
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarHeader className="p-2">
          {state == 'expanded' && (
            <span className="text-lg text-neutral-900 font-semibold">GrowSmart</span>
          )}
        </SidebarHeader>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <NavLink to={item.url} end={item.url === '/'}>
                    {({ isActive }) => (
                      <SidebarMenuButton
                        tooltip={item.title}
                        isActive={isActive}
                        onClick={() => handleMenuClick(item.url)}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    )}
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex justify-end p-2">
          <SidebarTrigger>
            <PanelLeftClose
              className={`transition-transform ${state === 'collapsed' ? 'rotate-180' : ''}`}
            />
          </SidebarTrigger>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
