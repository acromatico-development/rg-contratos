'use client'

import { Bars3Icon } from '@heroicons/react/24/outline'
import { useNavigation } from '@hooks'

import Breadcrumb from './Breadcrumb'
import NavbarProfile from './Profile'
import SidebarToggle from './SidebarToggle'

export const Navbar = () => {
  const { setSidebarOpen, isSidebarCollapsed, toggleSidebar } = useNavigation()

  return (
    <div className="sticky top-0 z-50 w-full">
      <div className="flex h-16 items-center gap-x-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 shadow-sm sm:gap-x-6 sm:px-6 backdrop-blur-sm bg-white/60 dark:bg-gray-900/60">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="-m-2.5 p-2.5 text-gray-700 dark:text-gray-200 lg:hidden"
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon className="size-6" aria-hidden="true" />
        </button>

        <div className="hidden lg:block">
          <SidebarToggle isCollapsed={isSidebarCollapsed} onClick={toggleSidebar} />
        </div>

        <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 lg:hidden" aria-hidden="true" />

        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
          <div className="flex items-center flex-1">
            <Breadcrumb />
          </div>

          <div className="flex items-center gap-x-4 lg:gap-x-6">
            <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200 dark:lg:bg-gray-700" aria-hidden="true" />
            <NavbarProfile />
          </div>
        </div>
      </div>
    </div>
  )
}