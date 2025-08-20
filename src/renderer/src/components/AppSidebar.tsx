import { Home, Inbox, PanelLeftClose } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useSidebar } from '@/components/ui/sidebar-context'

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

import React from 'react'

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

export function AppSidebar(): React.ReactElement {
  const { state } = useSidebar()
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarHeader className="p-2">
          {state == 'expanded' && <span className="text-lg font-semibold">GrowSmart</span>}
        </SidebarHeader>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton tooltip={item.title} asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex justify-end p-2">
          <SidebarTrigger>
            <PanelLeftClose />
          </SidebarTrigger>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
