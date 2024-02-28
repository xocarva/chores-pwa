/* eslint-disable react/jsx-props-no-spreading */
import { FormEventHandler } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import { RegisterUserData } from '../schemas';

interface RegisterFormProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
  register: UseFormRegister<RegisterUserData>;
  errors: FieldErrors<RegisterUserData>;
}

function RegisterForm({ onSubmit, register, errors }: RegisterFormProps) {
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
      <Button type="submit">Rexistro</Button>
    </form>
  );
}

export default RegisterForm;
