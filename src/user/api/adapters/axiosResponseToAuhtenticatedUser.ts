import { AxiosResponse } from 'axios';
import { AuthenticatedUser } from '../entities';

const axiosResponseToAuthenticatedUser = (
  res: AxiosResponse
): AuthenticatedUser => {
  const { userName, token } = res.data as AuthenticatedUser;

  return { userName, token };
};

export default axiosResponseToAuthenticatedUser;
