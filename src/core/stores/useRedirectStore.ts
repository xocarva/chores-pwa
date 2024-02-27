import { create } from 'zustand';

export interface RedirectState {
  redirectPath: string;
  setRedirectPath: (path: string) => void;
}

const useRedirectStore = create<RedirectState>((set) => ({
  redirectPath: '',
  setRedirectPath: (path) => set({ redirectPath: path }),
}));

export default useRedirectStore;
