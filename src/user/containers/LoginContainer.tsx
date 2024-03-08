import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Typography, Link as MuiLink, Grid } from '@mui/material';
import { ChoresLogo, useNotification } from '../../core';
import { LoginForm } from '../components';
import { useUser } from '../hooks';
import { LoginUserData, loginUserDataSchema } from '../schemas';

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

  const onSubmit = (userData: LoginUserData) => login(userData);

  useEffect(() => {
    if (errorMessage) {
      showNotification(errorMessage, 'error');
    }
  }, [errorMessage, showNotification]);

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '100vh' }}
    >
      <ChoresLogo />
      <Grid item xs={10} sm={10} md={10} lg={10} xl={10} mt={3}>
        <LoginForm
          onSubmit={handleSubmit(onSubmit)}
          register={register}
          errors={errors}
        />
        <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
          ¿Non tes conta?{' '}
          <MuiLink component={RouterLink} to="/register" color="primary">
            ¡Rexístrate!
          </MuiLink>
        </Typography>
      </Grid>
    </Grid>
  );
}

export default LoginContainer;
