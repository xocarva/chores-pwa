/* eslint-disable react/jsx-props-no-spreading */
import { FormEventHandler } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Button, TextField, Typography } from '@mui/material';
import { LoginUserData } from '../schemas';

interface LoginFormProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
  register: UseFormRegister<LoginUserData>;
  errors: FieldErrors<LoginUserData>;
}

function LoginForm({ onSubmit, register, errors }: LoginFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <TextField
        label="Email"
        variant="outlined"
        {...register('email')}
        error={Boolean(errors.email)}
        helperText={errors.email?.message}
      />
      <TextField
        label="Contrasinal"
        type="password"
        variant="outlined"
        {...register('password')}
        error={Boolean(errors.password)}
        helperText={errors.password?.message}
      />
      <Button type="submit">Login</Button>
    </form>
  );
}

export default LoginForm;
