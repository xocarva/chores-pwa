import { create } from 'zustand';
import { Space } from '../api';

interface SpacesState {
  spaces: Space[];
  currentSpace: Space | null;
  activeSpaceId: number | null;
  activeSpaceTitle: string | null;
  setCurrentSpace: (space: Space) => void;
  setSpaces: (spaces: Space[]) => void;
  setActiveSpaceId: (id: number) => void;
  setActiveSpaceTitle: (title: string) => void;
  clearSpaces: () => void;
}

const useSpacesStore = create<SpacesState>((set) => ({
  spaces: [],
  currentSpace: null,
  activeSpaceId: null,
  activeSpaceTitle: null,
  setCurrentSpace: (space) => set({ currentSpace: space }),
  setSpaces: (spaces) => set({ spaces }),
  setActiveSpaceId: (id) => set({ activeSpaceId: id }),
  setActiveSpaceTitle: (title) => set({ activeSpaceTitle: title }),
  clearSpaces: () =>
    set({
      spaces: [],
      currentSpace: null,
      activeSpaceId: null,
      activeSpaceTitle: null,
    }),
}));

export default useSpacesStore;
