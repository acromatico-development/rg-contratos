import RecoverPasswordForm from './Form'
import AuthCard from '../AuthCard'

const RecoverPasswordPage = () => {
  return (
    <AuthCard
      title="Recupera tu contraseña"
      description="Ingresa tu correo electrónico para recibir instrucciones"
      footerText="¿Ya recordaste tu contraseña?"
      footerLinkText="Iniciar sesión"
      footerLinkHref="/auth/login"
    >
      <RecoverPasswordForm />
    </AuthCard>
  )
} 

export default RecoverPasswordPage;