import { AxiosError, AxiosResponse } from 'axios';
import { api, axiosErrorToCustomError } from '../../../core';
import { axiosResponseToSpace } from '../adapters';

const getSpace = async (id: number) => {
  return api
    .get(`/spaces/${id}`)
    .then((res: AxiosResponse) => axiosResponseToSpace(res))
    .catch((error: AxiosError) =>
      Promise.reject(axiosErrorToCustomError(error))
    );
};

export default getSpace;
