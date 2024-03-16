import { z } from 'zod';

export const updateSpaceSchema = z.object({
  title: z
    .string()
    .min(3, 'O título debe ter un mínimo de 3 caracteres')
    .optional(),
  description: z.string().optional(),
  users: z
    .array(
      z.object({
        id: z.number(),
        admin: z.boolean(),
      })
    )
    .optional(),
});

export type UpdateSpaceData = z.infer<typeof updateSpaceSchema>;
