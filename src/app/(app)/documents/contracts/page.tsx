"use client"

import { useEffect, useState, useCallback } from 'react'
import { IContract, ITableRow } from '@interface'
import { readManyContractsNocodb } from '@services'
import { Table, Button } from '@components'
import { useDebounce, useNotification, useModal } from '@hooks'
import { useAuth } from '@context/AuthContext'

import ContractManager from './ContractManager'

const ContractsPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [contracts, setContracts] = useState<IContract[]>([])
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 20
  })

  const { showModal, hideModal } = useModal()
  const { showNotification } = useNotification()
  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  const { user } = useAuth()

  const fetchContracts = useCallback(async (page: number, search?: string) => {
    try {
      setLoading(true)
      const {
        code,
        message,
        data
      } = await readManyContractsNocodb({
        offset: (page - 1) * pagination.itemsPerPage,
        limit: pagination.itemsPerPage,
        search
      })

      if (code === 200 && data) {
        setContracts(data.contracts)
        setPagination(data.pagination)
      } else {
        showNotification({
          type: 'error',
          message: message || 'Error al cargar contratos'
        })
      }
    } catch (error) {
      showNotification({
        type: 'error',
        message: `Error al cargar contratos: ${error instanceof Error ? error.message : 'Error desconocido'}`
      })
    } finally {
      setLoading(false)
    }
  }, [pagination.itemsPerPage, showNotification])

  useEffect(() => {
    fetchContracts(currentPage, debouncedSearchTerm)
  }, [currentPage, debouncedSearchTerm, fetchContracts])

  const handleSearch = (search: string) => {
    setSearchTerm(search)
    setCurrentPage(1)
  }

  const handleCreateContract = useCallback(() => {
    showModal(
      <ContractManager
        onSuccess={() => {
          hideModal()
          fetchContracts(currentPage, debouncedSearchTerm)
        }}
        userId={user?.Id}
      />,
      { title: 'Crear nuevo contrato', maxWidth: 'xl' }
    )
  }, [currentPage, debouncedSearchTerm, fetchContracts, hideModal, showModal, user?.Id])

  const columns = [
    {
      header: 'Identificador',
      accessor: 'Identifier',
      searchable: true
    },
    {
      header: 'Descripción',
      accessor: 'Description',
      searchable: true
    },
    {
      header: 'Creador',
      accessor: 'CreatedByUserId',
      searchable: true
    }
  ]

  const formatTableData = useCallback((contracts: IContract[]): ITableRow[] => {
    return contracts.map(contract => ({
      identifier: {
        text: {
          value: contract.Identifier || '-',
          bold: true
        },
        subText: contract.Name || '-',
        link: `/documents/contracts/${contract.Identifier}`
      },
      rows: [
        {
          type: 'single',
          data: {
            text: {
              value: contract.Description || '-',
              bold: false
            }
          }
        },
        {
          type: 'double',
          data: {
            text: {
              value: contract.CreatedByUserId?.Name || '-',
              bold: false
            },
            subText: contract.CreatedByUserId?.Email || ''
          }
        }
      ]
    }))
  }, [])

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4 gap-4">
        <h1 className="text-2xl font-bold">Contratos</h1>
        <div className="flex-shrink-0">
          <Button
            onClick={handleCreateContract}
            className="w-fit"
          >
            Crear Contrato
          </Button>
        </div>
      </div>
      <Table
        columns={columns}
        data={formatTableData(contracts)}
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
          placeholder: 'Buscar contratos...'
        }}
        loading={loading}
      />
    </div>
  )
}

export default ContractsPage
