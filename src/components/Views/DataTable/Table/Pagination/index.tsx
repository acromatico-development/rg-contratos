import { IPagination } from '@interface'

import { PaginationInfo } from './PaginationInfo'
import { PaginationControls } from './PaginationControls'

export const TablePagination = ({ currentPage, totalPages, onPageChange, totalItems, itemsPerPage }: IPagination) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <PaginationInfo startItem={startItem} endItem={endItem} totalItems={totalItems} />
        <div>
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </div>
  )
}
