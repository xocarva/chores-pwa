import { AxiosResponse } from 'axios';
import { api } from '../../../core';
import { axiosResponseToTasks } from '../adapters';

const getTasks = async (spaceId: number) => {
  return api
    .get(`/spaces/${spaceId}/tasks`)
    .then((res: AxiosResponse) => axiosResponseToTasks(res));
};

export default getTasks;
