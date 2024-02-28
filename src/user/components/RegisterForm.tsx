/* eslint-disable react/jsx-props-no-spreading */
import { FormEventHandler } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Button, Grid, TextField } from '@mui/material';
import { RegisterUserData } from '../schemas';

interface RegisterFormProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
  register: UseFormRegister<RegisterUserData>;
  errors: FieldErrors<RegisterUserData>;
}

function RegisterForm({ onSubmit, register, errors }: RegisterFormProps) {
  return (
    <form onSubmit={onSubmit}>
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

export default RegisterForm;
