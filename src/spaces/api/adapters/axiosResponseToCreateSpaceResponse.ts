import { AxiosResponse } from 'axios';
import { Space } from '../entities';

const axiosResponseToCreateSpaceResponse = (res: AxiosResponse): Space => {
  const { space } = res.data;
  return space;
};

export default axiosResponseToCreateSpaceResponse;
