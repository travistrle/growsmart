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
          <div className="w-screen h-screen flex flex-col bg-gray-200 dark:bg-black">
            <TitleBar />
            <div className="flex flex-1 overflow-hidden">
              <AppSidebar />

              <SidebarInset className="flex-1 flex flex-col bg-neutral-100 dark:bg-neutral-800/80 overflow-y-auto">
                <main className="flex flex-1 p-8">
                  <Outlet />
                </main>
              </SidebarInset>
            </div>
          </div>
        </SidebarProvider>
      </SoundProvider>
    </ThemeProvider>
  )
}

export default MainLayout
