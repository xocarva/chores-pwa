/* eslint-disable react/jsx-props-no-spreading */
import { FormEventHandler } from 'react';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from 'react-hook-form';
import { Autocomplete, Button, Grid, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import { CreateTaskData } from '../schemas';
import { User } from '../../user';

interface TaskProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
  register: UseFormRegister<CreateTaskData>;
  errors: FieldErrors<CreateTaskData>;
  control: Control<CreateTaskData>;
  users: User[];
}

function TaskForm({ onSubmit, register, errors, control, users }: TaskProps) {
  return (
    <form onSubmit={onSubmit} noValidate>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <TextField
            label="Título"
            variant="outlined"
            fullWidth
            required
            {...register('title', { required: true })}
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
          <Controller
            name="users"
            control={control}
            render={({ field: { onChange, value, ...fieldProps } }) => (
              <Autocomplete
                {...fieldProps}
                multiple
                options={users}
                getOptionLabel={(option) => option.name ?? 'Falta nome usuario'}
                value={users.filter((user: User) =>
                  value.some(
                    (selectedUser: User) => selectedUser.id === user.id
                  )
                )}
                onChange={(_, newValue) => {
                  onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    required
                    {...params}
                    label="Usuarios"
                    placeholder="Selecciona usuarios"
                    error={Boolean(errors.users)}
                    helperText={errors.users?.message}
                  />
                )}
              />
            )}
          />
        </Grid>
        <Grid item>
          <Controller
            name="date"
            control={control}
            render={({ field: { onChange, value, ref } }) => (
              <DatePicker
                label="Data límite"
                value={value}
                inputRef={ref}
                onChange={(newValue: Dayjs | null) => {
                  onChange(newValue);
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    helperText: errors.date?.message,
                    error: Boolean(errors.date),
                  },
                }}
              />
            )}
          />
        </Grid>
        <Grid item>
          <Button type="submit" variant="contained" fullWidth>
            Gardar tarefa
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default TaskForm;
