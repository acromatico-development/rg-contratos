'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface AsideLinkProps {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  showText?: boolean
}

export const AsideLink = ({ name, href, icon: Icon, showText = true }: AsideLinkProps) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={`group flex items-center gap-x-3 rounded-md p-3 text-sm font-medium leading-6 transition-all duration-200 ${
        showText ? '' : 'justify-center'
      } ${
        isActive
          ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white'
      }`}
      title={name}
    >
      <Icon
        className={`h-5 w-5 shrink-0 transition-colors duration-200 ${
          isActive
            ? 'text-gray-900 dark:text-white'
            : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
        }`}
        aria-hidden="true"
      />
      {showText && name}
    </Link>
  )
} 