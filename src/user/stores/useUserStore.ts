import { create } from 'zustand';
import { AuthenticatedUser } from '../api';
import { useSpacesStore } from '../../spaces/stores';
import { useTasksStore } from '../../tasks/stores';
import { useInvitationStore } from '../../invitations/stores';

interface UserState {
  isAuthenticated: boolean;
  userName: string | null;
  userId: number | null;
  login: (user: AuthenticatedUser) => void;
  logout: () => void;
}

const initialState = {
  isAuthenticated: Boolean(localStorage.getItem('token')),
  userName: localStorage.getItem('userName') || null,
  userId: localStorage.getItem('userId')
    ? Number(localStorage.getItem('userId'))
    : null,
};

const useUserStore = create<UserState>((set) => ({
  ...initialState,
  login: (user) => {
    localStorage.setItem('userName', user.userName);
    localStorage.setItem('token', user.token);
    localStorage.setItem('userId', String(user.userId));
    set({
      isAuthenticated: true,
      userName: user.userName,
      userId: user.userId,
    });
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    set({
      isAuthenticated: false,
      userName: null,
      userId: null,
    });
    useSpacesStore.getState().clearSpaces();
    useTasksStore.getState().clearTasks();
    useInvitationStore.getState().deleteInviteToken();
  },
}));

export default useUserStore;
