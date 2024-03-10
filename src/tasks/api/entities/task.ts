export interface Task {
  id: number;
  title: string;
  date?: Date;
  completed: boolean;
  description?: string;
  users: {
    id: number;
    name: string;
  }[];
}
