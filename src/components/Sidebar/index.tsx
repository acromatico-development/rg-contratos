'use client'

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from '@headlessui/react'
import {
  XMarkIcon,
  HomeIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline'

import { Logo } from '@components'

import { MainNavigation } from './MainNavigation'
import { SecondaryNavigation } from './SecondaryNavigation'

const navigation = [
  { name: 'Início', href: '/', icon: HomeIcon },
  { name: 'Documentos', href: '/documents', icon: DocumentTextIcon },
]

export const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
  isCollapsed
}: {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  isCollapsed: boolean
}) => {
  return (
    <>
      <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 flex">
          <DialogPanel
            transition
            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <TransitionChild>
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon aria-hidden="true" className="size-6 text-sidebar-text" />
                </button>
              </div>
            </TransitionChild>
            <SidebarContent isCollapsed={isCollapsed} />
          </DialogPanel>
        </div>
      </Dialog>

      <div className={`hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col transition-all duration-300 ${isCollapsed ? 'lg:w-20' : 'lg:w-72'
        }`}>
        <SidebarContent isCollapsed={isCollapsed} />
      </div>
    </>
  )
}

const SidebarContent = ({ isCollapsed }: { isCollapsed: boolean }) => (
  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-sidebar border-r border-sidebar-hover px-6 pb-4 overflow-x-hidden">
    <div className="flex h-16 shrink-0 items-center">
      <Logo showText={!isCollapsed} className={isCollapsed ? 'mx-auto' : ''} />
    </div>
    <nav className="flex flex-1 flex-col pt-4">
      <ul role="list" className="flex flex-1 flex-col gap-y-7">
        <li>
          <MainNavigation navigation={navigation} isCollapsed={isCollapsed} />
        </li>
        <li className="mt-auto">
          <SecondaryNavigation isCollapsed={isCollapsed} />
        </li>
      </ul>
    </nav>
  </div>
)