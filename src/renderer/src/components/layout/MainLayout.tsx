import React from 'react'

import { SidebarProvider, SidebarInset } from '../ui/sidebar'

import { AppSidebar } from '../AppSidebar'
import { Outlet } from 'react-router-dom'
import { TitleBar } from '../TitleBar'
import { SoundProvider } from '@/contexts/SoundContext'

const MainLayout: React.FC = () => {
  return (
    <SoundProvider>
      <SidebarProvider>
        <div className="flex flex-col h-screen w-full">
          <TitleBar />
          <div className="flex flex-grow-1 overflow-hidden">
            <AppSidebar />
            <SidebarInset className="flex-grow-1 flex flex-col overflow-hidden">
              <main className="flex-1 p-4 overflow-y-auto bg-neutral-100">
                <Outlet />
              </main>
            </SidebarInset>
          </div>
        </div>
      </SidebarProvider>
    </SoundProvider>
  )
}

export default MainLayout
