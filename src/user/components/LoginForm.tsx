/* eslint-disable react/jsx-props-no-spreading */
import { FormEventHandler } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Alert, Button, Grid, TextField } from '@mui/material';
import { LoginUserData } from '../schemas';

interface LoginFormProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
  register: UseFormRegister<LoginUserData>;
  errors: FieldErrors<LoginUserData>;
  errorMessage?: string;
}

function LoginForm({
  onSubmit,
  register,
  errors,
  errorMessage,
}: LoginFormProps) {
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
            Login
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

LoginForm.defaultProps = {
  errorMessage: undefined,
};

export default LoginForm;
