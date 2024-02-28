import { AxiosResponse } from 'axios';
import { api } from '../../../core/api';
import { axiosResponseToSpaces } from '../adapters';

const getSpaceTasks = async (id: number) => {
  return api
    .get(`/spaces/${id}/tasks`)
    .then((res: AxiosResponse) => axiosResponseToSpaces(res));
};

export default getSpaceTasks;
