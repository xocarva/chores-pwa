import { create } from 'zustand';

interface InvitationState {
  inviteToken: string | null;
  setInviteToken: (token: string) => void;
  deleteInviteToken: () => void;
}

const initialState = {
  inviteToken: localStorage.getItem('inviteToken') || null,
};

const useInvitationStore = create<InvitationState>((set) => ({
  ...initialState,
  setInviteToken: (inviteToken) => {
    localStorage.setItem('inviteToken', inviteToken);
    set({ inviteToken });
  },
  deleteInviteToken: () => {
    localStorage.removeItem('inviteToken');
    set({ inviteToken: null });
  },
}));

export default useInvitationStore;
