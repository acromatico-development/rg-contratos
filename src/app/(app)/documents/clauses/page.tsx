"use client"

import { useCallback, useState } from 'react'
import { IClause } from '@interface'
import { readManyClausesNocodb } from '@services'
import { useNotification, useModal } from '@hooks'
import { DataTableView, useDataTableStore } from '@components'
import CreateClauseForm from './Form'

const ClausesPage = () => {
  const [clauses, setClauses] = useState<IClause[]>([])
  const { showModal, hideModal } = useModal()
  const { showNotification } = useNotification()
  const { pagination, setPagination, setLoading } = useDataTableStore()

  const fetchClauses = useCallback(async (page: number, search?: string) => {
    try {
      setLoading(true)
      const { code, message, data } = await readManyClausesNocodb({
        offset: (page - 1) * pagination.itemsPerPage,
        limit: pagination.itemsPerPage,
        search
      })

      if (code === 200 && data) {
        setClauses(data.contracts)
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
  }, [pagination.itemsPerPage, showNotification, setLoading, setPagination])

  const handleCreateClause = useCallback(() => {
    showModal(
      <CreateClauseForm
        onSuccess={() => {
          hideModal()
          fetchClauses(1)
        }}
      />,
      { title: 'Crear nueva cláusula', maxWidth: 'md' }
    )
  }, [fetchClauses, hideModal, showModal])

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

  const formatTableData = useCallback((clauses: IClause[]) => {
    return clauses.map(clause => ({
      identifier: {
        text: {
          value: clause.Identifier || '-',
          bold: true
        },
        subText: clause.Name || '-',
        link: `/documents/clauses/${clause.Identifier}`
      },
      rows: [
        {
          type: 'single',
          data: {
            text: {
              value: clause.Description || '-',
              bold: false
            }
          }
        },
        {
          type: 'double',
          data: {
            text: {
              value: clause.CreatedByUserId?.Name || '-',
              bold: false
            },
            subText: clause.CreatedByUserId?.Email || ''
          }
        }
      ]
    }))
  }, [])

  return (
    <DataTableView
      title="Cláusulas"
      createButton={{
        label: "Crear Cláusula",
        onClick: handleCreateClause
      }}
      columns={columns}
      data={clauses}
      fetchData={fetchClauses}
      formatTableData={formatTableData}
    />
  )
}

export default ClausesPage