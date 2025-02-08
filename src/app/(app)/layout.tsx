'use client'

import { Navbar, Sidebar } from '@components'
import { useNavigation } from '@hooks'

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { sidebarOpen, setSidebarOpen, isSidebarCollapsed } = useNavigation()

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        isCollapsed={isSidebarCollapsed}
      />

      <div className={`transition-all duration-300 ${isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-72'}`}>
        <Navbar />

        <main className="h-[calc(100vh-64px)]">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AppLayout