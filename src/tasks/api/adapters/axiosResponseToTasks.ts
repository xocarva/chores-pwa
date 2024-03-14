import { AxiosResponse } from 'axios';
import dayjs from 'dayjs';
import { Task } from '../entities';

const axiosResponseToTasks = (res: AxiosResponse): Task[] => {
  const tasks = res.data.tasks.map((task: any) => ({
    ...task,
    date: task.date ? dayjs(task.date) : undefined,
  }));
  return tasks as Task[];
};

export default axiosResponseToTasks;
