import { create } from 'zustand';
import { AuthState } from '../types';

const initialState = {
  isAuthenticated: Boolean(localStorage.getItem('token')),
  userName: localStorage.getItem('userName') || null,
};

export const useAuthStore = create<AuthState>((set) => ({
  ...initialState,
  login: (userName: string) => {
    localStorage.setItem('userName', userName);
    set({
      isAuthenticated: true,
      userName,
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
