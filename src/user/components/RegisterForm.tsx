/* eslint-disable react/jsx-props-no-spreading */
import { FormEventHandler } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Alert, Button, Grid, TextField } from '@mui/material';
import { RegisterUserData } from '../schemas';

interface RegisterFormProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
  register: UseFormRegister<RegisterUserData>;
  errors: FieldErrors<RegisterUserData>;
  errorMessage?: string;
}

function RegisterForm({
  onSubmit,
  register,
  errors,
  errorMessage,
}: RegisterFormProps) {
  return (
    <form onSubmit={onSubmit} noValidate>
      {errorMessage && (
        <Alert severity="error" sx={{ my: 2 }}>
          {errorMessage}
        </Alert>
      )}
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <TextField
            label="Nome"
            type="name"
            variant="outlined"
            fullWidth
            {...register('name')}
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Email"
            variant="outlined"
            required
            fullWidth
            {...register('email')}
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Contrasinal"
            type="password"
            variant="outlined"
            required
            fullWidth
            {...register('password')}
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
          />
        </Grid>
        <Grid item>
          <Button type="submit" variant="contained" fullWidth>
            Rexistro
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

RegisterForm.defaultProps = {
  errorMessage: undefined,
};

export default RegisterForm;
