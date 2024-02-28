import { AxiosResponse } from 'axios';
import { api } from '../../../core/api';
import { axiosResponseToSpaces } from '../adapters';

const getSpaces = async () => {
  return api
    .get('/spaces')
    .then((res: AxiosResponse) => axiosResponseToSpaces(res));
};

export default getSpaces;
