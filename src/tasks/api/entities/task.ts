export interface Task {
  id: number;
  title: string;
  date?: Date;
  completed: boolean;
  users: {
    id: number;
    name: string;
  }[];
}
