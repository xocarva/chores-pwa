import { AxiosError, AxiosResponse } from 'axios';
import { api, axiosErrorToCustomError } from '../../../core';
import { LoginUserData } from '../../schemas';
import { axiosResponseToAuthenticatedUser } from '../adapters';

const loginRequest = async (userData: LoginUserData) => {
  return api
    .post('/login', userData)
    .then((res: AxiosResponse) => axiosResponseToAuthenticatedUser(res))
    .catch((error: AxiosError) =>
      Promise.reject(axiosErrorToCustomError(error))
    );
};

export default loginRequest;
