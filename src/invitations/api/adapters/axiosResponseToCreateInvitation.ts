import { AxiosResponse } from 'axios';

const axiosResponseToCreateInvitation = (res: AxiosResponse): string => {
  const url = import.meta.env.VITE_APP_URL;
  const { token } = res.data;

  return `${url}/invitations/${token}`;
};

export default axiosResponseToCreateInvitation;
