/* eslint-disable react/jsx-props-no-spreading */
import { FormEventHandler } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Button, TextField, Typography } from '@mui/material';
import { RegisterUserData } from '../schemas';

interface RegisterFormProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
  onToggleForm: () => void;
  register: UseFormRegister<RegisterUserData>;
  errors: FieldErrors<RegisterUserData>;
  errorMessage: string;
}

function RegisterForm({
  onSubmit,
  onToggleForm,
  register,
  errors,
  errorMessage,
}: RegisterFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <TextField
        label="Nome"
        type="name"
        variant="outlined"
        {...register('name')}
        error={Boolean(errors.name)}
        helperText={errors.name?.message}
      />
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
      <Button type="submit">Rexistro</Button>
      <Button onClick={onToggleForm}>¿Xa tes conta? Fai login</Button>
    </form>
  );
}

export default RegisterForm;
