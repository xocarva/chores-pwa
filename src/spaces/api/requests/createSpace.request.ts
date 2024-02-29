import { AxiosError, AxiosResponse } from 'axios';
import { api, axiosErrorToCustomError } from '../../../core';
import { axiosResponseToCreateSpaceResponse } from '../adapters';
import { Space } from '../entities';
import { CreateSpaceData } from '../../schemas';

const createSpace = async (spaceData: CreateSpaceData): Promise<Space> => {
  return api
    .post('/spaces', spaceData)
    .then((res: AxiosResponse) => axiosResponseToCreateSpaceResponse(res))
    .catch((error: AxiosError) =>
      Promise.reject(axiosErrorToCustomError(error))
    );
};

export default createSpace;
