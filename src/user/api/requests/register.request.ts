import { AxiosError, AxiosResponse } from 'axios';
import { api, axiosErrorToCustomError } from '../../../core';
import { RegisterUserData } from '../../schemas';
import { axiosResponseToAuthenticatedUser } from '../adapters';

const registerRequest = async (userData: RegisterUserData) => {
  return api
    .post('/register', userData)
    .then((res: AxiosResponse) => axiosResponseToAuthenticatedUser(res))
    .catch((error: AxiosError) =>
      Promise.reject(axiosErrorToCustomError(error))
    );
};

export default registerRequest;
