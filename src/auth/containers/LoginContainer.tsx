import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginForm } from '../components';
import { useAuth } from '../hooks';
import { LoginUserData, loginUserDataSchema } from '../schemas';

interface LoginContainerProps {
  onToggleForm: () => void;
}

function LoginContainer({ onToggleForm }: LoginContainerProps) {
  const [errorMessage, setErrorMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserData>({
    resolver: zodResolver(loginUserDataSchema),
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
          : 'Algo foi mal, téntao de novo máis tarde'
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
