import { AxiosError } from 'axios';
import {
  ConflictError,
  ForbiddenError,
  GenericError,
  NotFoundError,
  UnauthorizedError,
  UnprocessableContentError,
} from '../errors';

interface ErrorResponse {
  message?: string;
}

const axiosErrorToCustomError = (error: AxiosError) => {
  const status = error.response?.status;
  const message =
    (error.response?.data as ErrorResponse)?.message || 'Algo foi mal';

  let customError;

  switch (status) {
    case 401:
      customError = new UnauthorizedError(message);
      break;
    case 403:
      customError = new ForbiddenError(message);
      break;
    case 404:
      customError = new NotFoundError(message);
      break;
    case 409:
      customError = new ConflictError(message);
      break;
    case 422:
      customError = new UnprocessableContentError(message);
      break;
    default:
      customError = new GenericError(message);
  }

  return customError;
};

export default axiosErrorToCustomError;
