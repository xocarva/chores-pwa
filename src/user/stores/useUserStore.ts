import { create } from 'zustand';
import { AuthenticatedUser } from '../api';
import { useSpacesStore } from '../../spaces/stores';
import { useTasksStore } from '../../tasks/stores';

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
    useSpacesStore.getState().clearSpaces();
    useTasksStore.getState().clearTasks();
  },
}));

export default useUserStore;
