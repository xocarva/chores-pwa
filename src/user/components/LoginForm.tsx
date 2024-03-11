/* eslint-disable react/jsx-props-no-spreading */
import { FormEventHandler } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Button, Grid, TextField } from '@mui/material';
import { LoginUserData } from '../schemas';

interface LoginFormProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
  register: UseFormRegister<LoginUserData>;
  errors: FieldErrors<LoginUserData>;
}

function LoginForm({ onSubmit, register, errors }: LoginFormProps) {
  return (
    <form onSubmit={onSubmit} noValidate>
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

export default LoginForm;
