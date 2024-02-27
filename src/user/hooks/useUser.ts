import { loginRequest, registerRequest } from '../api';
import { useUserStore } from '../stores';

const useUser = () => {
  const register = async (name: string, email: string, password: string) => {
    const { token } = await registerRequest({ name, email, password });
    useUserStore.getState().login({ token, userName: name });
  };

  const login = async (email: string, password: string) => {
    const user = await loginRequest({ email, password });
    useUserStore.getState().login(user);
  };

  const logout = () => {
    useUserStore.getState().logout();
  };

  const { isAuthenticated, userName } = useUserStore((state) => ({
    isAuthenticated: state.isAuthenticated,
    userName: state.userName,
  }));

  return { login, logout, isAuthenticated, userName, register };
};

export default useUser;
