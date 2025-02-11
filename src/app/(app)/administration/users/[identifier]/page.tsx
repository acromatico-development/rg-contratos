'use client'

import { useEffect, useState, useCallback } from 'react'
import { readOneUserByIdentifierNocodb, updateUserStatusNocodb } from '@services'
import { IUser } from '@interface'
import { useNotification } from '@hooks'

interface Props {
  params: {
    identifier: string
  }
}

const UserPage = ({ params }: Props) => {
  const [user, setUser] = useState<IUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)

  const { showNotification } = useNotification()

  const fetchUser = useCallback(async () => {
    try {
      const { data } = await readOneUserByIdentifierNocodb(params.identifier)
      setUser(data)
    } catch (error) {
      showNotification({ message: `Error al cargar el usuario: ${error instanceof Error ? error.message : 'Error desconocido'}`, type: 'error' })
    } finally {
      setLoading(false)
    }
  }, [params.identifier, showNotification])

  const handleToggleStatus = async () => {
    if (!user) return

    try {
      setUpdating(true)
      const { message } = await updateUserStatusNocodb(user.Identifier, !user.IsActive)
      showNotification({ message, type: "info" })
      await fetchUser()
    } catch (error) {
      showNotification({ message: `Error al actualizar el estado del usuario: ${error instanceof Error ? error.message : 'Error desconocido'}`, type: 'error' })
    } finally {
      setUpdating(false)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  if (loading) return <div>Cargando...</div>
  if (!user) return <div>Usuario no encontrado</div>

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Detalles del Usuario</h1>
        <button
          onClick={handleToggleStatus}
          disabled={updating}
          className={`px-4 py-2 rounded-md text-white font-medium ${user.IsActive
            ? 'bg-red-600 hover:bg-red-700'
            : 'bg-green-600 hover:bg-green-700'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {updating ? 'Actualizando...' : user.IsActive ? 'Desactivar Usuario' : 'Activar Usuario'}
        </button>
      </div>

      <div className="space-y-4">
        <p><strong>UID:</strong> {user.UID}</p>
        <p><strong>Email:</strong> {user.Email}</p>
        <p><strong>Nombre:</strong> {user.Name}</p>
        <p><strong>Identificador:</strong> {user.Identifier}</p>
        <p><strong>Rol:</strong> {user.Role}</p>
        <p>
          <strong>Estado:</strong>{' '}
          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-medium ${user.IsActive
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
            }`}>
            {user.IsActive ? 'Activo' : 'Inactivo'}
          </span>
        </p>
      </div>
    </div>
  )
}

export default UserPage