import { AxiosError, AxiosResponse } from 'axios';
import { api, axiosErrorToCustomError } from '../../../core';
import { axiosResponseToCreateTaskResponse } from '../adapters';
import { Task } from '../entities';
import { CreateTaskData } from '../../schemas';

const createTask = async (taskData: CreateTaskData): Promise<Task> => {
  return api
    .post('/tasks', taskData)
    .then((res: AxiosResponse) => axiosResponseToCreateTaskResponse(res))
    .catch((error: AxiosError) =>
      Promise.reject(axiosErrorToCustomError(error))
    );
};

export default createTask;
