import { AxiosError } from 'axios';
import { useRedirectStore } from '../../stores';

type ErrorHandler = (error: AxiosError) => void;

interface ErrorHandlers {
  [statusCode: number]: ErrorHandler;
}

const errorHandlers: ErrorHandlers = {
  401: (error: AxiosError) => {
    if (error.config?.headers['X-Is-Login-Attempt'] === 'true') {
      throw new Error('Credenciales incorrectas');
    } else {
      useRedirectStore.getState().setRedirectPath('/login');
    }
  },
  409: (error: AxiosError) => {
    if (error.config?.headers['X-Is-Register-Attempt'] === 'true') {
      throw new Error('Este email xa foi rexistrado');
    }
  },
};

const handleErrorInterceptor = (error: AxiosError) => {
  const handler = errorHandlers[error.response?.status || 0];
  if (handler) {
    handler(error);
  } else {
    throw new Error('Algo foi mail, téntao de novo máis tarde');
  }
  return Promise.reject(error);
};

export default handleErrorInterceptor;
