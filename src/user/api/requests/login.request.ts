import { AxiosResponse } from 'axios';
import { api } from '../../../core/api';
import { LoginUserData } from '../../schemas';
import { axiosResponseToAuthenticatedUser } from '../adapters';

const loginRequest = async (userData: LoginUserData) => {
  const { email, password } = userData;
  return api
    .post(
      '/login',
      { email, password },
      { headers: { 'X-Is-Login-Attempt': 'true' } }
    )
    .then((res: AxiosResponse) => axiosResponseToAuthenticatedUser(res));
};

export default loginRequest;
