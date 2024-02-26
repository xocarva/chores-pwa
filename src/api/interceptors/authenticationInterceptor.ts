import { InternalAxiosRequestConfig } from 'axios';

const authenticationInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  const updatedConfig = config;

  if (token) {
    updatedConfig.headers.Authorization = `Bearer ${token}`;
  }

  return updatedConfig;
};

export default authenticationInterceptor;
