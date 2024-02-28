import { create } from 'zustand';
import { Task } from '../api';

interface UseTasksState {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  clearTasks: () => void;
}

const useTasksStore = create<UseTasksState>((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  clearTasks: () => set({ tasks: [] }),
}));

export default useTasksStore;
