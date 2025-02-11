'use client'

import { useState, useCallback } from 'react'
import { IColumn, IMenuItem, IPagination, ISearch, ITableRow, RowType } from '@interface'

import { SingleRow, DoubleRow, IdentifierRow, StatusRow } from './Row'
import { TableHeader } from './Header'
import { TableMenu } from './Menu'
import { TablePagination } from './Pagination'
import { TableSearch } from './Search'

interface TableProps {
  columns: IColumn[]
  data: ITableRow[]
  pagination: IPagination
  search: ISearch
  loading?: boolean
}

export const Table = ({
  columns,
  data,
  pagination,
  search,
  loading = false,
}: TableProps) => {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);

  const handleMenuToggle = useCallback((index: number) => {
    setOpenMenuIndex(prev => prev === index ? null : index);
  }, []);

  const handleMenuItemClick = useCallback((menuItem: IMenuItem) => {
    setOpenMenuIndex(null);
    if (menuItem.type === 'action' && menuItem.action) {
      menuItem.action();
    }
  }, []);

  const renderCell = (row: RowType) => {
    switch (row.type) {
      case 'single':
        return <SingleRow {...row.data} />;
      case 'double':
        return <DoubleRow {...row.data} />;
      case 'status':
        return <StatusRow {...row.data} />;
      default:
        return null;
    }
  };

  return (
    <div className="mt-8 flow-root overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <TableSearch
          value={search.value}
          onChange={search.onChange}
          placeholder={search.placeholder}
        />

        <div className="relative">
          {loading && (
            <div className="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center z-10">
              <div className="text-gray-500">Cargando...</div>
            </div>
          )}

          <table className="w-full text-left">
            <TableHeader columns={columns} />
            <tbody>
              {data.map((item, rowIndex) => (
                <tr key={rowIndex}>
                  <td className="relative py-4 pr-3 text-sm">
                    <IdentifierRow {...item.identifier} />
                  </td>
                  {item.rows.map((row, colIndex) => (
                    !columns[colIndex + 1]?.hidden && (
                      <td
                        key={`${rowIndex}-${colIndex}`}
                        className="relative py-4 pr-3 text-sm text-gray-500"
                      >
                        {renderCell(row)}
                      </td>
                    )
                  ))}
                  {item.menuItems && item.menuItems.length > 0 && (
                    <td className="relative py-4 text-center">
                      <TableMenu
                        key={`menu-${rowIndex}`}
                        menuItems={item.menuItems}
                        isOpen={openMenuIndex === rowIndex}
                        onToggle={() => handleMenuToggle(rowIndex)}
                        onItemClick={handleMenuItemClick}
                      />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4">
          <TablePagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={pagination.onPageChange}
            totalItems={pagination.totalItems}
            itemsPerPage={pagination.itemsPerPage}
          />
        </div>
      </div>
    </div>
  );
};