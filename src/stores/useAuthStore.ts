import { create } from 'zustand';
import { AuthState } from '../types';

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  userName: null,
  login: (userName) =>
    set(() => ({
      isAuthenticated: true,
      userName,
    })),
  logout: () =>
    set(() => ({
      isAuthenticated: false,
      userName: null,
    })),
}));
