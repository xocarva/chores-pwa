import { z } from 'zod';

export const loginUserDataSchema = z.object({
  email: z.string().email({ message: 'Email non válido' }),
  password: z
    .string()
    .min(8, { message: 'O contrasinal debe ter 8 caracteres' }),
});

export type LoginUserData = z.infer<typeof loginUserDataSchema>;
