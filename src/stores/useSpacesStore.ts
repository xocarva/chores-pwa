import { create } from 'zustand';
import { User } from '../types';

interface SpaceSummary {
  id: number;
  title: string;
  description: string;
  users: User[];
}

interface SpacesState {
  spaces: SpaceSummary[];
  activeSpaceId: number | null;
  activeSpaceTitle: string | null;
  setSpaces: (spaces: SpaceSummary[]) => void;
  setActiveSpaceId: (id: number) => void;
  setActiveSpaceTitle: (title: string) => void;
}

export const useSpacesStore = create<SpacesState>((set) => ({
  spaces: [],
  activeSpaceId: null,
  activeSpaceTitle: null,
  setSpaces: (spaces) => set({ spaces }),
  setActiveSpaceId: (id) => set({ activeSpaceId: id }),
  setActiveSpaceTitle: (title) => set({ activeSpaceTitle: title }),
}));
