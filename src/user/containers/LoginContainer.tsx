import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Typography, Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useEffect } from 'react';
import { LoginForm } from '../components';
import { useUser } from '../hooks';
import { LoginUserData, loginUserDataSchema } from '../schemas';
import { useNotification } from '../../core';

function LoginContainer() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUserData>({
    resolver: zodResolver(loginUserDataSchema),
  });

  const { login, errorMessage } = useUser();
  const { showNotification } = useNotification();
  const onSubmit = async (userData: LoginUserData) => login(userData);

  useEffect(() => {
    if (errorMessage) {
      showNotification(errorMessage, 'error');
    }
  }, [errorMessage, showNotification]);

  return (
    <>
      <LoginForm
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        errors={errors}
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
