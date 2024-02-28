import { useState } from 'react';
import { CustomError, UnauthorizedError } from '../../core';
import { loginRequest, registerRequest } from '../api';
import { useUserStore } from '../stores';
import { LoginUserData } from '../schemas';

const useUser = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const register = async (name: string, email: string, password: string) => {
    const { token } = await registerRequest({ name, email, password });
    useUserStore.getState().login({ token, userName: name });
  };

  const login = async (userData: LoginUserData) => {
    setLoading(true);
    setErrorMessage('');

    try {
      const user = await loginRequest(userData);
      useUserStore.getState().login(user);
    } catch (err) {
      if (err instanceof UnauthorizedError) {
        setErrorMessage('Credenciais incorrectas');
      } else if (err instanceof CustomError) {
        setErrorMessage(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    useUserStore.getState().logout();
  };

  const { isAuthenticated, userName } = useUserStore((state) => ({
    isAuthenticated: state.isAuthenticated,
    userName: state.userName,
  }));

  return {
    login,
    logout,
    isAuthenticated,
    userName,
    register,
    loading,
    errorMessage,
  };
};

export default useUser;
