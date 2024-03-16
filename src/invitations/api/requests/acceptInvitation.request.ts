import { AxiosError, AxiosResponse } from 'axios';
import { api, axiosErrorToCustomError } from '../../../core';
import { axiosResponseToAcceptInvitation } from '../adapters';
import { Space } from '../../../spaces/api';

const processInvitation = async (
  token: string
): Promise<{ spaceId: number; spaces: Space[] }> => {
  return api
    .post(`/invitations/${token}/accept`)
    .then((res: AxiosResponse) => axiosResponseToAcceptInvitation(res))
    .catch((error: AxiosError) =>
      Promise.reject(axiosErrorToCustomError(error))
    );
};

export default processInvitation;
