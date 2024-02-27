import { create } from 'zustand';

interface SpaceSummary {
  id: number;
  title: string;
  description: string;
  users: {
    id: number;
    name: string;
  };
}

interface SpacesState {
  spaces: SpaceSummary[];
  activeSpaceId: number | null;
  activeSpaceTitle: string | null;
  setSpaces: (spaces: SpaceSummary[]) => void;
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
