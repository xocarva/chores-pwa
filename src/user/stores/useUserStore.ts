import { create } from 'zustand';
import { AuthenticatedUser } from '../api';

interface UserState {
  isAuthenticated: boolean;
  userName: string | null;
  login: (user: AuthenticatedUser) => void;
  logout: () => void;
}

const initialState = {
  isAuthenticated: Boolean(localStorage.getItem('token')),
  userName: localStorage.getItem('userName') || null,
};

const useUserStore = create<UserState>((set) => ({
  ...initialState,
  login: (user) => {
    localStorage.setItem('userName', user.userName);
    localStorage.setItem('token', user.token);
    set({
      isAuthenticated: true,
      userName: user.userName,
    });
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    set({
      isAuthenticated: false,
      userName: null,
    });
  },
}));

export default useUserStore;
