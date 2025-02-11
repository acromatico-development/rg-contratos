'use client'

import * as Yup from 'yup'
import { useEffect } from 'react'
import { Input, Button, Form, Select } from '@components'
import { useForm, useNotification } from '@hooks'
import { createUserNocodb, getLastIdentifierNocodb } from '@services'
import { generateTemporaryPassword, hashPassword } from '@utils'

interface CreateUserValues {
  uid: string
  email: string
  displayName?: string
  identifier: string
  password: string
  role: 'ADMIN' | 'USER'
}

const CreateUserForm = ({ uid, email, displayName, onSuccess }: { uid: string, email: string, displayName?: string, onSuccess?: () => void }) => {
  const { showNotification } = useNotification()

  const formik = useForm<CreateUserValues>({
    initialValues: {
      uid,
      email,
      displayName: displayName || '',
      identifier: '',
      password: generateTemporaryPassword(),
      role: 'USER'
    },
    validationSchema: Yup.object({
      uid: Yup.string().required('El UID es requerido'),
      email: Yup.string()
        .email('Correo electrónico inválido')
        .required('El correo electrónico es requerido'),
      displayName: Yup.string(),
      identifier: Yup.string().required('El identificador es requerido'),
      password: Yup.string().required('La contraseña es requerida'),
      role: Yup.string().oneOf(['ADMIN', 'USER']).required('El rol es requerido')
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const hashedPassword = await hashPassword(values.password);
        await createUserNocodb({ ...values, password: hashedPassword });
        showNotification({ message: 'Usuario creado exitosamente', type: 'success' });
        if (onSuccess) onSuccess();
      } catch (error) {
        showNotification({
          message: `Error al crear el usuario: ${error instanceof Error ? error.message : 'Error desconocido'}`,
          type: 'error'
        });
      }
      setSubmitting(false);
    },
  })

  useEffect(() => {
    const setInitialIdentifier = async () => {
      const identifier = await getLastIdentifierNocodb()
      formik.setFieldValue('identifier', identifier.data)
    }
    setInitialIdentifier()
  }, [formik])

  return (
    <Form formik={formik}>
      <Input
        id="uid"
        label="UID"
        type="text"
        disabled
        error={formik.errors.uid}
        touched={formik.touched.uid}
        {...formik.getFieldProps('uid')}
      />

      <Input
        id="email"
        label="Correo electrónico"
        type="email"
        disabled
        error={formik.errors.email}
        touched={formik.touched.email}
        {...formik.getFieldProps('email')}
      />

      <Input
        id="displayName"
        label="Nombre"
        type="text"
        error={formik.errors.displayName}
        touched={formik.touched.displayName}
        {...formik.getFieldProps('displayName')}
      />

      <Input
        id="identifier"
        label="Identificador"
        type="text"
        disabled
        error={formik.errors.identifier}
        touched={formik.touched.identifier}
        {...formik.getFieldProps('identifier')}
      />

      <Input
        id="password"
        label="Contraseña temporal"
        type="text"
        disabled
        error={formik.errors.password}
        touched={formik.touched.password}
        {...formik.getFieldProps('password')}
      />

      <Select
        id="role"
        label="Rol"
        options={[
          { value: 'USER', label: 'Usuario' },
          { value: 'ADMIN', label: 'Administrador' }
        ]}
        error={formik.errors.role}
        touched={formik.touched.role}
        {...formik.getFieldProps('role')}
      />

      <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
        <Button
          type="submit"
          disabled={formik.isSubmitting}
          className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
        >
          {formik.isSubmitting ? 'Creando...' : 'Crear Usuario'}
        </Button>
        <Button
          type="button"
          onClick={onSuccess}
          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
        >
          Cancelar
        </Button>
      </div>
    </Form>
  )
}

export default CreateUserForm