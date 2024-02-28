import { AxiosError, AxiosResponse } from 'axios';
import { api, axiosErrorToCustomError } from '../../../core';
import { axiosResponseToSpaces } from '../adapters';

const getSpaces = async () => {
  return api
    .get('/spaces')
    .then((res: AxiosResponse) => axiosResponseToSpaces(res))
    .catch((error: AxiosError) =>
      Promise.reject(axiosErrorToCustomError(error))
    );
};

export default getSpaces;
