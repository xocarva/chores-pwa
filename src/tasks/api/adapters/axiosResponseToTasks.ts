import { AxiosResponse } from 'axios';
import { Task } from '../entities';

const axiosResponseToTasks = (res: AxiosResponse): Task[] => {
  const spaces = res.data.tasks as Task[];
  return spaces;
};

export default axiosResponseToTasks;
