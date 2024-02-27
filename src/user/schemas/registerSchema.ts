import { z } from 'zod';

export const registerUserDataSchema = z.object({
  name: z.string().min(2, { message: 'O nome debe ter alomenos 2 caracteres' }),
  email: z.string().email({ message: 'Email non válido' }),
  password: z
    .string()
    .min(8, { message: 'O contrasinal debe ter 8 caracteres' }),
});

export type RegisterUserData = z.infer<typeof registerUserDataSchema>;
