'use client'

import { useEffect, useState, useCallback } from 'react'
import { IUserFirebase, ITableRow } from '@interface'
import { readManyUsersFirebase } from '@services'
import { Table } from '@components'
import { useDebounce, useModal, useNotification } from '@hooks'

import CreateUserForm from './Form'

interface IUser extends IUserFirebase {
  existsInNocoDB?: boolean
  identifier?: string
}

const UsersPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 20
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [users, setUsers] = useState<IUser[]>([])

  const { showModal, hideModal } = useModal()
  const { showNotification } = useNotification()
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  const fetchUsers = useCallback(async (page: number, search?: string) => {
    try {
      setLoading(true)
      const {
        code,
        message,
        data
      } = await readManyUsersFirebase(page, search, pagination.itemsPerPage)

      if (code === 200) {
        setUsers(data?.users || [])
        setPagination(data?.pagination || {
          currentPage: 1,
          totalPages: 1,
          totalItems: 0,
          itemsPerPage: 20
        })
      } else {
        showNotification({
          type: 'error',
          message: message || 'Error al cargar usuarios'
        })
      }
    } catch (error) {
      showNotification({
        type: 'error',
        message: `Error al cargar usuarios: ${error instanceof Error ? error.message : 'Error desconocido'}`
      })
    } finally {
      setLoading(false)
    }
  }, [pagination.itemsPerPage, showNotification])

  const handleCreateUser = useCallback((row: IUser) => {
    showModal(
      <CreateUserForm
        uid={row.uid}
        email={row.email || ''}
        displayName={row.displayName || ''}
        onSuccess={() => {
          hideModal()
          fetchUsers(currentPage, debouncedSearchTerm)
        }}
      />,
      { title: 'Crear nuevo usuario', maxWidth: 'md' }
    )
  }, [debouncedSearchTerm, fetchUsers, hideModal, showModal, currentPage])

  const formatTableData = useCallback((users: IUser[]): ITableRow[] => {
    return users.map(user => ({
      identifier: {
        text: {
          value: user.displayName || '-',
          bold: true
        },
        subText: user.email || undefined,
        link: user.existsInNocoDB && user.identifier
          ? `/administration/users/${user.identifier}`
          : undefined
      },
      rows: [
        {
          type: 'single',
          data: {
            text: {
              value: user.uid,
              bold: false
            }
          }
        },
        {
          type: 'double',
          data: {
            text: {
              value: user.email || '-',
              bold: false
            },
            subText: 'Email verificado'
          }
        },
        {
          type: 'status',
          data: {
            text: {
              value: user.existsInNocoDB ? 'Registrado' : 'Pendiente',
              bold: false
            },
            color: user.existsInNocoDB ? 'green' : 'yellow'
          }
        }
      ],
      menuItems: !user.existsInNocoDB ? [
        {
          type: 'action',
          label: 'Crear usuario',
          action: () => handleCreateUser(user)
        }
      ] : undefined
    }));
  }, [handleCreateUser])

  const columns = [
    {
      header: 'Usuario',
      accessor: 'uid',
      searchable: true
    },
    {
      header: 'Nombre',
      accessor: 'displayName',
      searchable: true
    },
    {
      header: 'Email',
      accessor: 'email',
      searchable: true
    },
    {
      header: 'Estado',
      accessor: 'status',
      searchable: false
    }
  ]

  useEffect(() => {
    fetchUsers(currentPage, debouncedSearchTerm)
  }, [currentPage, debouncedSearchTerm, fetchUsers])

  const handleSearch = (search: string) => {
    setSearchTerm(search)
    setCurrentPage(1)
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Usuarios Registrados</h1>
      <Table
        columns={columns}
        data={formatTableData(users)}
        pagination={{
          currentPage: pagination.currentPage,
          totalPages: pagination.totalPages,
          onPageChange: (page) => {
            setCurrentPage(page)
            fetchUsers(page, debouncedSearchTerm)
          },
          totalItems: pagination.totalItems,
          itemsPerPage: pagination.itemsPerPage
        }}
        search={{
          value: searchTerm,
          onChange: handleSearch,
          placeholder: 'Buscar por UID o Email...'
        }}
        loading={loading}
      />
    </div>
  )
}

export default UsersPage