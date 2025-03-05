'use client'

import { useEffect } from 'react'
import { Button } from '@components'
import { Table } from './Table'
import { useDebounce } from '@hooks'
import { useDataTableStore } from './store'
import type { ViewProps } from './types'

const DataTableView = <T,>({
  title,
  createButton,
  columns,
  data,
  fetchData,
  formatTableData
}: ViewProps<T>) => {
  const {
    currentPage,
    searchTerm,
    loading,
    pagination,
    setSearchTerm,
    setCurrentPage,
  } = useDataTableStore()

  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  useEffect(() => {
    fetchData(currentPage, debouncedSearchTerm)
  }, [currentPage, debouncedSearchTerm, fetchData])

  const handleSearch = (search: string) => {
    setSearchTerm(search)
    setCurrentPage(1)
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4 gap-4">
        <h1 className="text-2xl font-bold">{title}</h1>
        <div className="flex-shrink-0">
          <Button
            onClick={createButton.onClick}
            className="w-fit"
          >
            {createButton.label}
          </Button>
        </div>
      </div>
      <Table
        columns={columns}
        data={formatTableData(data)}
        pagination={{
          currentPage: pagination.currentPage,
          totalPages: pagination.totalPages,
          onPageChange: setCurrentPage,
          totalItems: pagination.totalItems,
          itemsPerPage: pagination.itemsPerPage
        }}
        search={{
          value: searchTerm,
          onChange: handleSearch,
          placeholder: `Buscar ${title.toLowerCase()}...`
        }}
        loading={loading}
      />
    </div>
  )
}

export default DataTableView