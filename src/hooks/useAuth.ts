import { api } from '../api';
import { useAuthStore } from '../stores';

export const useAuth = () => {
  const register = async (name: string, email: string, password: string) => {
    const { data } = await api.post(
      '/register',
      { name, email, password },
      { headers: { 'X-Is-Register-Attempt': 'true' } }
    );
    localStorage.setItem('token', data.token);
    useAuthStore.getState().login(name);
  };

  const login = async (email: string, password: string) => {
    const { data } = await api.post(
      '/login',
      { email, password },
      { headers: { 'X-Is-Login-Attempt': 'true' } }
    );
    localStorage.setItem('token', data.token);
    useAuthStore.getState().login(data.userName);
  };

  const logout = () => {
    localStorage.removeItem('token');
    useAuthStore.getState().logout();
  };

  const { isAuthenticated, userName } = useAuthStore((state) => ({
    isAuthenticated: state.isAuthenticated,
    userName: state.userName,
  }));

  return { login, logout, isAuthenticated, userName, register };
};
