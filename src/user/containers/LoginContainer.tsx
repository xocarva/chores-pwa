import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Typography, Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { LoginForm } from '../components';
import { useUser } from '../hooks';
import { LoginUserData, loginUserDataSchema } from '../schemas';

function LoginContainer() {
  const [errorMessage, setErrorMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserData>({
    resolver: zodResolver(loginUserDataSchema),
  });
  const { login } = useUser();

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
    <>
      <LoginForm
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        errors={errors}
        errorMessage={errorMessage}
      />
      <Typography variant="body2" sx={{ mt: 2 }}>
        ¿Non tes conta?{' '}
        <MuiLink component={RouterLink} to="/register" color="primary">
          ¡Rexístrate!
        </MuiLink>
      </Typography>
    </>
  );
}

export default LoginContainer;
