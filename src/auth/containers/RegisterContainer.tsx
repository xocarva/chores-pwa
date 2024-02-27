import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Snackbar } from '@mui/material';
import { RegisterForm } from '../components';
import { useNotification } from '../../hooks';
import { useAuth } from '../hooks';
import { RegisterUserData, registerUserDataSchema } from '../schemas';

interface RegisterContainerProps {
  onToggleForm: () => void;
}

function RegisterContainer({ onToggleForm }: RegisterContainerProps) {
  const [errorMessage, setErrorMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserData>({
    resolver: zodResolver(registerUserDataSchema),
  });
  const { register: registerUser } = useAuth();
  const { showNotification } = useNotification();

  const onSubmit = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      await registerUser(data.name, data.email, data.password);
      setErrorMessage('');
      showNotification('Rexistro completado con éxito');
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
      <RegisterForm
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        errors={errors}
        onToggleForm={onToggleForm}
        errorMessage={errorMessage}
      />
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
