import { z } from 'zod';
import dayjs, { Dayjs } from 'dayjs';
import { userSchema } from '../../user/schemas';

const dayjsSchema = z.preprocess(
  (arg) => {
    if (dayjs.isDayjs(arg)) return arg;
    if (typeof arg === 'string' || arg instanceof Date) {
      const parsedDate = dayjs(arg);
      if (parsedDate.isValid()) return parsedDate;
    }
    return undefined;
  },
  z
    .any()
    .refine((val) => dayjs.isDayjs(val), {
      message: 'Data non válida',
    })
    .transform((val) => val as Dayjs)
);

export const createTaskSchema = z.object({
  title: z.string().min(3, 'O título debe ter un mínimo de 3 caracteres'),
  completed: z.boolean().optional(),
  description: z.string().optional(),
  spaceId: z.number(),
  users: z.array(userSchema).min(1, 'Selecciona polo menos un usuario'),
  date: dayjsSchema.optional().nullable(),
});

export type CreateTaskData = z.infer<typeof createTaskSchema>;
