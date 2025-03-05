'use client'

import * as Yup from 'yup';

import { Input, Button, Form } from '@components';
import { login } from '@services';
import { useAuth } from '@context/AuthContext';
import { useForm, useNotification } from '@hooks';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

interface LoginValues {
  email: string;
  password: string;
  form?: string;
}

const firebaseConfig = {
  apiKey: "AIzaSyD_Abo_79gSh_FuXOwQ26CSdFPA_WKOlRA",
  authDomain: "rg-partners.firebaseapp.com",
  databaseURL: "https://rg-partners.firebaseio.com",
  projectId: "rg-partners",
  storageBucket: "rg-partners.appspot.com",
  messagingSenderId: "315198951927",
  appId: "1:315198951927:web:59df5a6f4d625a298e1ef2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

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
    onSubmit: async ({ email, password }, { router }) => {
      
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const idToken = await userCredential.user?.getIdToken();
        console.log(idToken);
      } catch (error) {
          showNotification({ message: error.message, type: 'error' });
          return;
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