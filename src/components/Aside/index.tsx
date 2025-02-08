import { useNavigation } from '@hooks'

import { AsideLink } from './AsideLink'
import { CollapseButton } from './CollapseButton'

interface AsideItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  current?: boolean
}

interface AsideProps {
  items: AsideItem[]
  children: React.ReactNode
}

export const Aside = ({ items, children }: AsideProps) => {
  const { isAsideCollapsed, toggleAside } = useNavigation()

  return (
    <div className="flex h-full">
      <nav className={`flex flex-col justify-between flex-none transition-all duration-300 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 h-full ${
        isAsideCollapsed ? 'w-20' : 'w-64'
      }`}>
        <ul role="list" className="flex flex-col gap-y-2 p-4">
          {items.map((item) => (
            <li key={item.name}>
              <AsideLink {...item} showText={!isAsideCollapsed} />
            </li>
          ))}
        </ul>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <CollapseButton isCollapsed={isAsideCollapsed} onClick={toggleAside} />
        </div>
      </nav>

      <div className="flex-1 p-6 overflow-auto">
        {children}
      </div>
    </div>
  )
}