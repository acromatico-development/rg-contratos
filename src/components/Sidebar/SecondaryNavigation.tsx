import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Squares2X2Icon, Cog6ToothIcon } from '@heroicons/react/24/outline'
import { useAuth } from '@context/AuthContext'

type Props = {
    isCollapsed: boolean
}

export const SecondaryNavigation = ({ isCollapsed }: Props) => {
    const { user } = useAuth()
    const pathname = usePathname()

    const navigation = [
        {
            name: 'Configuración',
            href: '/settings',
            icon: Cog6ToothIcon,
            show: true
        },
        {
            name: 'Panel de Administración',
            href: '/administration',
            icon: Squares2X2Icon,
            show: user?.Role === 'ADMIN'
        }
    ].filter(item => item.show)

    return (
        <ul role="list" className="-mx-2 space-y-3">
            {navigation.map((item) => {
                const isActive = pathname.startsWith(item.href)

                return (
                    <li key={item.name}>
                        <Link
                            href={item.href}
                            className={`group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold whitespace-nowrap ${
                                isActive
                                    ? 'bg-sidebar-active text-sidebar-text'
                                    : 'text-sidebar-text hover:bg-sidebar-hover'
                            } transition-colors ${isCollapsed ? 'justify-center' : ''}`}
                        >
                            <item.icon
                                aria-hidden="true"
                                className={`size-6 shrink-0 ${
                                    isActive
                                        ? 'text-sidebar-text'
                                        : 'text-sidebar-icon group-hover:text-sidebar-text'
                                } transition-colors`}
                            />
                            {!isCollapsed && item.name}
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
} 