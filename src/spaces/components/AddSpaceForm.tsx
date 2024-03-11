/* eslint-disable react/jsx-props-no-spreading */
import { FormEventHandler } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { Button, Grid, TextField } from '@mui/material';
import { CreateSpaceData } from '../schemas';

interface AddSpaceProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
  register: UseFormRegister<CreateSpaceData>;
  errors: FieldErrors<CreateSpaceData>;
}

function AddSpaceForm({ onSubmit, register, errors }: AddSpaceProps) {
  return (
    <form onSubmit={onSubmit} noValidate>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <TextField
            label="Título"
            variant="outlined"
            required
            fullWidth
            {...register('title')}
            error={Boolean(errors.title)}
            helperText={errors.title?.message}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Descripción"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            {...register('description')}
            error={Boolean(errors.description)}
            helperText={errors.description?.message}
          />
        </Grid>
        <Grid item>
          <Button type="submit" variant="contained" fullWidth>
            Crear espazo
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default AddSpaceForm;
