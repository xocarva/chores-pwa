import { AxiosError, AxiosResponse } from 'axios';
import { api, axiosErrorToCustomError } from '../../../core';
import { axiosResponseToCreateSpaceResponse } from '../adapters';
import { Space } from '../entities';
import { UpdateSpaceData } from '../../schemas';

const updateSpace = async (
  spaceId: number,
  spaceData: UpdateSpaceData
): Promise<Space> => {
  return api
    .patch(`/spaces${spaceId}`, spaceData)
    .then((res: AxiosResponse) => axiosResponseToCreateSpaceResponse(res))
    .catch((error: AxiosError) =>
      Promise.reject(axiosErrorToCustomError(error))
    );
};

export default updateSpace;
