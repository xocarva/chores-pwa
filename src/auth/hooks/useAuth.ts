import { useAuthStore } from '../stores';
import { loginService, registerService } from '../services';

const useAuth = () => {
  const register = async (name: string, email: string, password: string) => {
    const { data } = await registerService({ name, email, password });
    useAuthStore.getState().login(name, data.token);
  };

  const login = async (email: string, password: string) => {
    const { data } = await loginService({ email, password });
    useAuthStore.getState().login(data.userName, data.token);
  };

  const logout = () => {
    useAuthStore.getState().logout();
  };

  const { isAuthenticated, userName } = useAuthStore((state) => ({
    isAuthenticated: state.isAuthenticated,
    userName: state.userName,
  }));

  return { login, logout, isAuthenticated, userName, register };
};

export default useAuth;
