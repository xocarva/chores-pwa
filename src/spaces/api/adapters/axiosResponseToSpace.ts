import { AxiosResponse } from 'axios';
import { Space } from '../entities';

const axiosResponseToSpace = (res: AxiosResponse): Space => {
  const { space } = res.data;
  return space;
};

export default axiosResponseToSpace;
