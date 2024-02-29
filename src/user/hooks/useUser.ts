import { useState } from 'react';
import {
  ConflictError,
  GenericError,
  NotFoundError,
  UnauthorizedError,
  UnprocessableContentError,
} from '../../core';
import { loginRequest, registerRequest } from '../api';
import { useUserStore } from '../stores';
import { LoginUserData, RegisterUserData } from '../schemas';

const useUser = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const register = async (userData: RegisterUserData) => {
    setLoading(true);
    setErrorMessage('');

    try {
      const user = await registerRequest(userData);
      useUserStore.getState().login({
        token: user.token,
        userName: userData.name,
        userId: user.userId,
      });
    } catch (err) {
      if (err instanceof ConflictError) {
        setErrorMessage('Email xa rexistrado');
      } else if (err instanceof UnprocessableContentError) {
        setErrorMessage(`Datos non válidos: ${err.message}`);
      } else if (err instanceof GenericError) {
        setErrorMessage(err.message);
      }
    } finally {
      setLoading(false);
    }
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
      } else if (err instanceof NotFoundError) {
        setErrorMessage('O usuario non existe');
      } else if (err instanceof UnprocessableContentError) {
        setErrorMessage(`Datos non válidos: ${err.message}`);
      } else if (err instanceof GenericError) {
        setErrorMessage(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    useUserStore.getState().logout();
  };

  const { isAuthenticated, userName, userId } = useUserStore((state) => ({
    isAuthenticated: state.isAuthenticated,
    userName: state.userName,
    userId: state.userId,
  }));

  return {
    login,
    logout,
    isAuthenticated,
    userName,
    userId,
    register,
    loading,
    errorMessage,
  };
};

export default useUser;
