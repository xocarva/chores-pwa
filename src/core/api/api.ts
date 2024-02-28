import axios from 'axios';
import { authenticationInterceptor } from './interceptors';

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(authenticationInterceptor);
