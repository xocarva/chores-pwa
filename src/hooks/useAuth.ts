import { useAuthStore } from '../stores';
import { api } from '../api';

export const useAuth = () => {
  const login = async (email: string, password: string) => {
    try {
      const { data } = await api.post('/login', { email, password });
      localStorage.setItem('token', data.token);
      useAuthStore.getState().login(data.userName);
    } catch (error) {
      console.error('Login error', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    useAuthStore.getState().logout();
  };

  const { isAuthenticated, userName } = useAuthStore((state) => ({
    isAuthenticated: state.isAuthenticated,
    userName: state.userName,
  }));

  return { login, logout, isAuthenticated, userName };
};
