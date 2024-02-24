import { useAuthStore } from '../stores/useAuthStore';

export const useUser = () => {
  const { isAuthenticated, userName } = useAuthStore((state) => ({
    isAuthenticated: state.isAuthenticated,
    userName: state.userName,
  }));

  return { isAuthenticated, userName };
};
