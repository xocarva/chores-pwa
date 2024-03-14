import { Dayjs } from 'dayjs';

export interface Task {
  id: number;
  title: string;
  date?: Dayjs;
  completed: boolean;
  description?: string;
  users: {
    id: number;
    name: string;
  }[];
}
