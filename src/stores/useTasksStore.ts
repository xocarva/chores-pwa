import { create } from 'zustand';
import { Task } from '../types';

interface UseTasksState {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
}

const useTasksStore = create<UseTasksState>((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
}));

export default useTasksStore;
