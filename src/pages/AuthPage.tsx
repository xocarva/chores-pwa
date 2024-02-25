import { AuthContainer } from '../containers';

interface AuthPageProps {
  formType: 'login' | 'register';
}

function AuthPage({ formType }: AuthPageProps) {
  return (
    <>
      <h1>Chores</h1>
      <AuthContainer formType={formType} />
    </>
  );
}

export default AuthPage;
