import { ChevronLeftIcon } from '@heroicons/react/24/outline'

interface CollapseButtonProps {
  isCollapsed: boolean
  onClick: () => void
}

export const CollapseButton = ({ isCollapsed, onClick }: CollapseButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
        isCollapsed ? 'justify-center' : 'justify-start'
      }`}
      title={isCollapsed ? "Expandir menú" : "Colapsar menú"}
    >
      <ChevronLeftIcon 
        className={`size-5 text-gray-600 dark:text-gray-200 transition-transform duration-300 ${
          isCollapsed ? 'rotate-180' : ''
        }`} 
      />
      {!isCollapsed && (
        <span className="text-sm text-gray-600 dark:text-gray-200 whitespace-nowrap">
          Colapsar menú
        </span>
      )}
    </button>
  )
} 