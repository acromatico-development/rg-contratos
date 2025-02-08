'use client'

import * as Yup from 'yup';

import { Input, Button, Form } from '@components';
import { useForm, useNotification } from '@hooks';

interface RecoverPasswordValues {
  email: string;
  form?: string;
}

const RecoverPasswordForm = () => {
  const { showNotification } = useNotification();

  const formik = useForm<RecoverPasswordValues>({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Correo electrónico inválido')
        .required('El correo electrónico es requerido'),
    }),
    onSubmit: async ({ email }) => {
      showNotification({ message: `Correo electrónico enviado a ${email}`, type: 'success' });
    },
  });

  return (
    <Form formik={formik}>
      <Input
        id="email"
        label="Correo electrónico"
        type="email"
        error={formik.errors.email}
        touched={formik.touched.email}
        {...formik.getFieldProps('email')}
      />

      <Button
        type="submit"
        disabled={formik.isSubmitting}
      >
        {formik.isSubmitting ? 'Enviando...' : 'Enviar instrucciones'}
      </Button>
    </Form>
  );
}

export default RecoverPasswordForm;