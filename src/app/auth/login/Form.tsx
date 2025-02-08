'use client'

import * as Yup from 'yup';

import { Input, Button, Form } from '@components';
import { login } from '@services';
import { useAuth } from '@context/AuthContext';
import { useForm, useNotification } from '@hooks';

interface LoginValues {
  email: string;
  password: string;
  form?: string;
}

const LoginForm = () => {
  const { setUser } = useAuth();
  const { showNotification } = useNotification();

  const formik = useForm<LoginValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Correo electrónico inválido')
        .required('El correo electrónico es requerido'),
      password: Yup.string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres')
        .required('La contraseña es requerida'),
    }),
    onSubmit: async (values, { router }) => {
      const response = await login(values.email, values.password);

      if (response.status === 'error') {
        showNotification({ message: response.message, type: 'error' });
        return;
      }

      if (response.data) {
        const userData = { data: response.data };
        localStorage.setItem('user', JSON.stringify(userData));
        document.cookie = `user=${JSON.stringify(userData)}; path=/; max-age=86400`;
        setUser(response.data);
        showNotification({ message: 'Inicio de sesión exitoso', type: 'success' });
        router.push('/');
      }
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

      <Input
        id="password"
        label="Contraseña"
        type="password"
        error={formik.errors.password}
        touched={formik.touched.password}
        {...formik.getFieldProps('password')}
      />

      <Button
        type="submit"
        disabled={formik.isSubmitting}
      >
        {formik.isSubmitting ? 'Iniciando sesión...' : 'Iniciar sesión'}
      </Button>
    </Form>
  );
}

export default LoginForm;