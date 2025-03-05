'use client'

import { useEffect } from 'react'
import * as Yup from 'yup'
import { Input, Button, Form, Select } from '@components'
import { useForm, useNotification } from '@hooks'
import { IUserDTO } from '@interface'
import { createUserNocodb, getNextUserIdentifier } from '@services'
import { generateTemporaryPassword, hashPassword } from '@utils'

const CreateUserForm = ({ uid, email, displayName, onSuccess }: { uid: string, email: string, displayName?: string, onSuccess?: () => void }) => {
  const { showNotification } = useNotification()

  const formik = useForm<IUserDTO>({
    initialValues: {
      UID: uid,
      Email: email,
      DisplayName: displayName || '',
      Identifier: '',
      Password: generateTemporaryPassword(),
      Role: ""
    },
    validationSchema: Yup.object({
      UID: Yup.string().required('El UID es requerido'),
      Email: Yup.string()
        .email('Correo electrónico inválido')
        .required('El correo electrónico es requerido'),
      DisplayName: Yup.string().required('El nombre es requerido'),
      Identifier: Yup.string().required('El identificador es requerido'),
      Password: Yup.string().required('La contraseña es requerida'),
      Role: Yup.string().oneOf(['ADMIN', 'USER']).required('El rol es requerido')
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const hashedPassword = await hashPassword(values.Password);
        await createUserNocodb({ ...values, Password: hashedPassword });
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
      const identifier = await getNextUserIdentifier()
      formik.setFieldValue('Identifier', identifier.data)
    }
    setInitialIdentifier()
  }, [formik])

  return (
    <Form formik={formik}>
      <Input
        id="UID"
        label="UID"
        type="text"
        disabled
        error={formik.errors.UID}
        touched={formik.touched.UID}
        {...formik.getFieldProps('UID')}
      />

      <Input
        id="Email"
        label="Correo electrónico"
        type="email"
        disabled
        error={formik.errors.Email}
        touched={formik.touched.Email}
        {...formik.getFieldProps('Email')}
      />

      <Input
        id="DisplayName"
        label="Nombre"
        type="text"
        error={formik.errors.DisplayName}
        touched={formik.touched.DisplayName}
        {...formik.getFieldProps('DisplayName')}
      />

      <Input
        id="Identifier"
        label="Identificador"
        type="text"
        disabled
        error={formik.errors.Identifier}
        touched={formik.touched.Identifier}
        {...formik.getFieldProps('Identifier')}
      />

      <Input
        id="Password"
        label="Contraseña temporal"
        type="text"
        disabled
        error={formik.errors.Password}
        touched={formik.touched.Password}
        {...formik.getFieldProps('Password')}
      />

      <Select
        id="Role"
        label="Rol"
        options={[
          { value: 'USER', label: 'Usuario' },
          { value: 'ADMIN', label: 'Administrador' }
        ]}
        error={formik.errors.Role}
        touched={formik.touched.Role}
        {...formik.getFieldProps('Role')}
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