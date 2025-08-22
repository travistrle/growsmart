import { Home, Inbox, PanelLeftClose, Settings } from 'lucide-react'
import { NavLink } from 'react-router-dom'
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
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings
  }
]

export function AppSidebar(): ReactElement {
  const { state } = useSidebar()

  return (
    <Sidebar
      collapsible="icon"
      className="flex-none h-full border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
    >
      <SidebarHeader>
        <SidebarHeader className="p-2">
          {state == 'expanded' && (
            <span className="text-lg bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text mt-12 mb-4 font-bold">
              GrowSmart
            </span>
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
                      <SidebarMenuButton tooltip={item.title} isActive={isActive}>
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
