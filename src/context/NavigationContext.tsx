'use client'

import { createContext, useState } from 'react'

interface NavigationContextType {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  isSidebarCollapsed: boolean
  toggleSidebar: () => void
  isAsideCollapsed: boolean
  toggleAside: () => void
}

export const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true)
  const [isAsideCollapsed, setIsAsideCollapsed] = useState(true)

  const toggleSidebar = () => setIsSidebarCollapsed(prev => !prev)
  const toggleAside = () => setIsAsideCollapsed(prev => !prev)

  return (
    <NavigationContext.Provider
      value={{
        sidebarOpen,
        setSidebarOpen,
        isSidebarCollapsed,
        toggleSidebar,
        isAsideCollapsed,
        toggleAside
      }}
    >
      {children}
    </NavigationContext.Provider>
  )
} 