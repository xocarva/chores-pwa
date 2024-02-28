import { AxiosResponse } from 'axios';
import { Space } from '../entities';

const axiosResponseToSpaces = (res: AxiosResponse): Space[] => {
  const spaces = res.data.spaces as Space[];
  return spaces;
};

export default axiosResponseToSpaces;
