import React from 'react'

import { SidebarProvider, SidebarInset } from '../ui/sidebar'

import { AppSidebar } from '../AppSidebar'
import { Outlet } from 'react-router-dom'
import { TitleBar } from '../TitleBar'
import { SoundProvider } from '@/contexts/SoundProvider'
import { ThemeProvider } from '@/contexts/ThemeProvider'

const MainLayout: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <SoundProvider>
        <SidebarProvider>
          <div className="h-screen w-screen bg-gray-200 dark:bg-black items-center max-w-[1200px] mx-auto max-h-[800px] min-h-[600px] min-w-[800px] flex">
            <div className="h-full w-full flex flex-col rounded-lg shadow-2xl overflow-hidden">
              <TitleBar />
              <div className="w-full flex flex-1 overflow-hidden">
                <AppSidebar />
                <SidebarInset className="flex-1 flex flex-col overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                  <main className="w-full flex-1">
                    <Outlet />
                  </main>
                </SidebarInset>
              </div>
            </div>
          </div>
        </SidebarProvider>
      </SoundProvider>
    </ThemeProvider>
  )
}

export default MainLayout
