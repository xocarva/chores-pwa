import axios from 'axios';
import { useRedirectStore } from '../stores';

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (error.config.headers['X-Is-Login-Attempt'] === 'true') {
        throw new Error('Credenciais incorrectas');
      } else {
        useRedirectStore.getState().setRedirectPath('/login');
      }
    } else {
      throw new Error('Algo foi mail. Téntao de novo máis tarde.');
    }
    return Promise.reject(error);
  }
);
