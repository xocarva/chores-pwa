import { User } from './user.types';

export interface Task {
  id: number;
  title: string;
  date?: Date;
  completed: boolean;
  users: User[];
}
