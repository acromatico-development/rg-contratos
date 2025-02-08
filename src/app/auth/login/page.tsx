import AuthCard from '../AuthCard';
import LoginForm from './Form';

const LoginPage = () => {
  return (
    <AuthCard
      title="Inicia sesión en tu cuenta"
      description="Ingresa tus credenciales para continuar"
      footerText="¿Olvidaste tu contraseña?"
      footerLinkText="Recuperar contraseña"
      footerLinkHref="/auth/recover-password"
    >
      <LoginForm />
    </AuthCard>
  );
}

export default LoginPage;