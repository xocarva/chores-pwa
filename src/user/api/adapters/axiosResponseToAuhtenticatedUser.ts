import { AxiosResponse } from 'axios';
import { AuthenticatedUser } from '../entities';

const axiosResponseToAuthenticatedUser = (
  res: AxiosResponse
): AuthenticatedUser => {
  const { userName, token, userId } = res.data as AuthenticatedUser;

  return { userName, token, userId };
};

export default axiosResponseToAuthenticatedUser;
