import { z } from 'zod';
import { userSchema } from '../../user/schemas';

export const createTaskSchema = z.object({
  title: z.string().min(3, 'O título debe ter un mínimo de 3 caracteres'),
  completed: z.boolean().optional(),
  description: z.string().optional(),
  spaceId: z.number(),
  users: z.array(userSchema).min(1, 'Selecciona polo menos un usuario'),
  date: z
    .union([
      z.preprocess((arg) => {
        if (typeof arg === 'string' && arg !== '') {
          const parsedDate = new Date(arg);
          if (!Number.isNaN(parsedDate.getTime())) {
            return parsedDate;
          }
        }
        return arg;
      }, z.date()),
      z.null(),
    ])
    .optional(),
});

export type CreateTaskData = z.infer<typeof createTaskSchema>;
