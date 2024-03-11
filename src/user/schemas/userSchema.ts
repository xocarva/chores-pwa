import { z } from 'zod';

export const userSchema = z.object({
  id: z.number(),
  name: z.string().optional(),
});

export type User = z.infer<typeof userSchema>;
