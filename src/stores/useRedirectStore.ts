import { create } from 'zustand';
import { RedirectState } from '../types';

export const useRedirectStore = create<RedirectState>((set) => ({
  redirectPath: '',
  setRedirectPath: (path) => set({ redirectPath: path }),
}));
