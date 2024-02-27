/* eslint-disable react/jsx-props-no-spreading */
import { FormEventHandler } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Button, TextField, Typography } from '@mui/material';
import { LoginUserData } from '../schemas';

interface LoginFormProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
  onToggleForm: () => void;
  register: UseFormRegister<LoginUserData>;
  errors: FieldErrors<LoginUserData>;
  errorMessage: string;
}

function LoginForm({
  onSubmit,
  onToggleForm,
  register,
  errors,
  errorMessage,
}: LoginFormProps) {
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
      {errorMessage && <Typography color="error">{errorMessage}</Typography>}
      <Button type="submit">Login</Button>
      <Button onClick={onToggleForm}>¿Non tes conta? Rexístrate</Button>
    </form>
  );
}

export default LoginForm;
