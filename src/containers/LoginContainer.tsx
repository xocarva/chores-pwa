import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginForm } from '../components';
import { useAuth } from '../hooks';
import { LoginFormInputs, loginSchema } from '../schemas';

interface LoginContainerProps {
  onToggleForm: () => void;
}

function LoginContainer({ onToggleForm }: LoginContainerProps) {
  const [errorMessage, setErrorMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });
  const { login } = useAuth();

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      await login(data.email, data.password);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Algo foi mal. Téntao de novo máis tarde.'
      );
    }
  };

  return (
    <LoginForm
      onSubmit={handleSubmit(onSubmit)}
      register={register}
      errors={errors}
      onToggleForm={onToggleForm}
      errorMessage={errorMessage}
    />
  );
}

export default LoginContainer;
