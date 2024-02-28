import { create } from 'zustand';
import { Space } from '../api';

interface SpacesState {
  spaces: Space[];
  activeSpaceId: number | null;
  activeSpaceTitle: string | null;
  setSpaces: (spaces: Space[]) => void;
  setActiveSpaceId: (id: number) => void;
  setActiveSpaceTitle: (title: string) => void;
}

const useSpacesStore = create<SpacesState>((set) => ({
  spaces: [],
  activeSpaceId: null,
  activeSpaceTitle: null,
  setSpaces: (spaces) => set({ spaces }),
  setActiveSpaceId: (id) => set({ activeSpaceId: id }),
  setActiveSpaceTitle: (title) => set({ activeSpaceTitle: title }),
}));

export default useSpacesStore;
