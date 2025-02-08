'use client'

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useAuth } from '@context/AuthContext'
import { useRouter } from 'next/navigation'
import ThemeToggle from './ThemeToggle'
import Image from 'next/image'

const defaultAvatar = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"

const userNavigation = [
    { name: 'Mi perfil', href: '/settings/profile' },
    { name: 'Cerrar sesión', href: '#', action: 'signOut' },
]

const NavbarProfile = () => {
    const { user, logout } = useAuth()
    const router = useRouter()

    const handleNavigation = async (item: typeof userNavigation[0]) => {
        if (item.action === 'signOut') {
            await logout()
            router.push('/login')
        } else {
            router.push(item.href)
        }
    }

    return (
        <div className="flex items-center gap-4">
            <ThemeToggle />
            <Menu as="div" className="relative">
                <MenuButton className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    <Image
                        alt={user?.Name || "User avatar"}
                        src={user?.Avatar || defaultAvatar}
                        width={32}
                        height={32}
                        className="rounded-full bg-gray-50 ring-2 ring-white dark:ring-gray-800"
                    />
                    <span className="hidden lg:flex lg:items-center">
                        <span className="ml-4 text-sm/6 font-semibold text-gray-900 dark:text-white">
                            {user?.Name || 'User'}
                        </span>
                        <ChevronDownIcon className="ml-2 size-5 text-gray-400" aria-hidden="true" />
                    </span>
                </MenuButton>
                <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white dark:bg-gray-800 py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                >
                    {userNavigation.map((item) => (
                        <MenuItem key={item.name}>
                            <button
                                onClick={() => handleNavigation(item)}
                                className="block w-full px-3 py-1 text-left text-sm/6 text-gray-900 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                                {item.name}
                            </button>
                        </MenuItem>
                    ))}
                </MenuItems>
            </Menu>
        </div>
    )
}

export default NavbarProfile