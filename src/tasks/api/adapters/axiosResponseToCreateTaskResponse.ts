import { AxiosResponse } from 'axios';
import dayjs from 'dayjs';
import { Task } from '../entities';

const axiosResponseToCreateTaskResponse = (res: AxiosResponse): Task => {
  const { task } = res.data;

  return {
    ...task,
    date: task.date ? dayjs(task.date) : undefined,
  };
};

export default axiosResponseToCreateTaskResponse;
