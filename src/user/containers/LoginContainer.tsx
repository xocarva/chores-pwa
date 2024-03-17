import { Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Typography,
  Link as MuiLink,
  Grid,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { ChoresLogo } from '../../core';
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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { login, errorMessage } = useUser();
  const onSubmit = (userData: LoginUserData) => login(userData);

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '100vh' }}
    >
      <ChoresLogo />
      <Grid
        item
        xs={12}
        sm={10}
        style={{ width: isMobile ? '100%' : 'auto', minWidth: '300px' }}
        mt={2}
      >
        <LoginForm
          onSubmit={handleSubmit(onSubmit)}
          register={register}
          errors={errors}
          errorMessage={errorMessage}
        />
        <Typography
          variant="body2"
          sx={{ mt: 2, textAlign: 'center', width: '100%' }}
        >
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
