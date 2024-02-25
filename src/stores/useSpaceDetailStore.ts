import create from 'zustand';
import { User } from '../types';

interface Task {
  id: number;
  title: string;
  date?: Date;
  completed: boolean;
  users: User[];
}

interface SpaceDetailsState {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
}

export const useSpaceDetailsStore = create<SpaceDetailsState>((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
}));
