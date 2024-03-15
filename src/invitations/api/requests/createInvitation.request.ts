import { AxiosError, AxiosResponse } from 'axios';
import { api, axiosErrorToCustomError } from '../../../core';
import { axiosResponseToCreateInvitation } from '../adapters';

const createInvitation = async (spaceId: number): Promise<string> => {
  return 'https://chores.com/invitation/dsh32u432fdb34';
  return api
    .post('/invitation', { spaceId })
    .then((res: AxiosResponse) => axiosResponseToCreateInvitation(res))
    .catch((error: AxiosError) =>
      Promise.reject(axiosErrorToCustomError(error))
    );
};

export default createInvitation;
