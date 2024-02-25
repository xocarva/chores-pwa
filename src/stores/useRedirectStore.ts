import { create } from 'zustand';
import { RedirectState } from '../types';

const useRedirectStore = create<RedirectState>((set) => ({
  redirectPath: '',
  setRedirectPath: (path) => set({ redirectPath: path }),
}));

export default useRedirectStore;
