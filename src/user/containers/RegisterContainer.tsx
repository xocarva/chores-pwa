import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Snackbar, Typography, Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useNotification } from '../../core';
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
  const { showNotification } = useNotification();

  const onSubmit = async (userData: RegisterUserData) => {
    registerRequest(userData);

    if (!errorMessage) {
      showNotification('Usuario rexistrado con éxito');
    }
  };

  useEffect(() => {
    if (errorMessage) {
      showNotification(errorMessage, 'error');
    }
  }, [errorMessage, showNotification]);

  return (
    <>
      <RegisterForm
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        errors={errors}
      />
      <Typography variant="body2" sx={{ mt: 2 }}>
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
    </>
  );
}

export default RegisterContainer;
