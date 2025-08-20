import React from 'react'

import { SidebarProvider, SidebarTrigger, SidebarInset } from '../ui/sidebar'

import { AppSidebar } from '../AppSidebar'
import { Outlet } from 'react-router-dom'

const MainLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SidebarTrigger />
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}

export default MainLayout
