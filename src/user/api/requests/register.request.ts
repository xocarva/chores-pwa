import { AxiosResponse } from 'axios';
import { api } from '../../../core/api';
import { RegisterUserData } from '../../schemas';
import { axiosResponseToAuthenticatedUser } from '../adapters';

const registerRequest = async (userData: RegisterUserData) => {
  const { name, email, password } = userData;
  return api
    .post(
      '/register',
      { name, email, password },
      { headers: { 'X-Is-Register-Attempt': 'true' } }
    )
    .then((res: AxiosResponse) => axiosResponseToAuthenticatedUser(res));
};

export default registerRequest;
