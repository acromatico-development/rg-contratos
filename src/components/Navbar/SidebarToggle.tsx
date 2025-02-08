'use client'

import { ChevronLeftIcon } from '@heroicons/react/24/outline'

type Props = {
  isCollapsed: boolean
  onClick: () => void
}

const SidebarToggle = ({ isCollapsed, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
    >
      <ChevronLeftIcon 
        className={`size-5 text-gray-600 dark:text-gray-200 transition-transform duration-300 ${
          isCollapsed ? 'rotate-180' : ''
        }`} 
      />
    </button>
  )
}

export default SidebarToggle 