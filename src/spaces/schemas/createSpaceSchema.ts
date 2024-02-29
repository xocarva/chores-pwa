import { z } from 'zod';

export const createSpaceSchema = z.object({
  title: z.string(),
  description: z.string(),
  users: z.array(
    z.object({
      id: z.number(),
      admin: z.boolean(),
    })
  ),
});

export type CreateSpaceData = z.infer<typeof createSpaceSchema>;
