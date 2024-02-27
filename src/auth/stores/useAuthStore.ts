import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  userName: string | null;
  login: (userName: string, token: string) => void;
  logout: () => void;
}

const initialState = {
  isAuthenticated: Boolean(localStorage.getItem('token')),
  userName: localStorage.getItem('userName') || null,
};

const useAuthStore = create<AuthState>((set) => ({
  ...initialState,
  login: (userName: string, token: string) => {
    localStorage.setItem('userName', userName);
    localStorage.setItem('token', token);
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

export default useAuthStore;
