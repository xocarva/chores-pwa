import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Alert,
  Snackbar,
  Typography,
  Link as MuiLink,
  Grid,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { ChoresLogo } from '../../core';
import { RegisterForm } from '../components';
import { useUser } from '../hooks';
import { RegisterUserData, registerUserDataSchema } from '../schemas';

function RegisterContainer() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserData>({
    resolver: zodResolver(registerUserDataSchema),
  });
  const { register: registerRequest, errorMessage } = useUser();

  const onSubmit = async (userData: RegisterUserData) => {
    await registerRequest(userData);
  };

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
        <RegisterForm
          onSubmit={handleSubmit(onSubmit)}
          register={register}
          errors={errors}
          errorMessage={errorMessage}
        />
        <Typography variant="body2" sx={{ mt: 2, textAlign: 'center' }}>
          ¿Xa tes conta?{' '}
          <MuiLink component={RouterLink} to="/login" color="primary">
            ¡Loguéate!
          </MuiLink>
        </Typography>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
        >
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity="success"
            sx={{ width: '100%' }}
          >
            Rexistro completado con éxito. Redirixindo...
          </Alert>
        </Snackbar>
      </Grid>
    </Grid>
  );
}

export default RegisterContainer;
