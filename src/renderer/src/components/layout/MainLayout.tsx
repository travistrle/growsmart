import React from 'react'

import { SidebarProvider, SidebarTrigger, SidebarInset } from '../ui/sidebar'

import { AppSidebar } from '../AppSidebar'
import { Outlet } from 'react-router-dom'
import { TitleBar } from '../TitleBar'

const MainLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <div className="flex flex-col h-screen w-full">
        <TitleBar />
        <div className="flex flex-grow-1 overflow-hidden">
          <AppSidebar />
          <SidebarInset className="flex-grow-1 flex flex-col overflow-hidden">
            <main className="flex-1 p-4 overflow-y-auto bg-neutral-100">
              <SidebarTrigger />
              <Outlet />
            </main>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  )
}

export default MainLayout
