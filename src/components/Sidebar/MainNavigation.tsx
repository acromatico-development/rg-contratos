import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HomeIcon } from '@heroicons/react/24/outline'

type NavigationItem = {
  name: string
  href: string
  icon: typeof HomeIcon
  current?: boolean
}

type Props = {
  navigation: NavigationItem[]
  isCollapsed: boolean
}

export const MainNavigation = ({ navigation, isCollapsed }: Props) => {
  const pathname = usePathname()

  return (
    <ul role="list" className="-mx-2 space-y-3">
      {navigation.map((item) => {
        const isActive = item.href === '/'
          ? pathname === '/'
          : pathname.startsWith(item.href)

        return (
          <li key={item.name}>
            <Link
              href={item.href}
              className={`${isActive
                  ? 'bg-sidebar-active text-sidebar-text'
                  : 'text-sidebar-text hover:bg-sidebar-hover'
                } group flex gap-x-3 rounded-md p-3 text-sm/6 font-semibold transition-colors ${isCollapsed ? 'justify-center' : ''
                }`}
            >
              <item.icon
                aria-hidden="true"
                className={`${isActive ? 'text-sidebar-text' : 'text-sidebar-icon group-hover:text-sidebar-text'
                  } size-6 shrink-0 transition-colors`}
              />
              {!isCollapsed && item.name}
            </Link>
          </li>
        )
      })}
    </ul>
  )
} 