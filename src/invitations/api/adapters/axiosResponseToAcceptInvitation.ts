import { AxiosResponse } from 'axios';
import { Space } from '../../../spaces/api';

const axiosResponseToProcessInvitation = (
  res: AxiosResponse
): { spaceId: number; spaces: Space[] } => {
  return res.data;
};

export default axiosResponseToProcessInvitation;
