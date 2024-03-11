import { AxiosResponse } from 'axios';
import { Task } from '../entities';

const axiosResponseToCreateTaskResponse = (res: AxiosResponse): Task => {
  const { task } = res.data;
  return task;
};

export default axiosResponseToCreateTaskResponse;
