import { useEffect } from 'react';
import { useSpacesStore } from '../stores';
import { api } from '../api';

export const useSpaces = () => {
  const {
    spaces,
    setSpaces,
    setActiveSpaceId,
    activeSpaceId,
    activeSpaceTitle,
    setActiveSpaceTitle,
  } = useSpacesStore();

  useEffect(() => {
    const fetchSpaces = async () => {
      const { data } = await api.get('/spaces');
      setSpaces(data.spaces);
    };

    fetchSpaces();
  }, [setSpaces]);

  return {
    spaces,
    activeSpaceId,
    activeSpaceTitle,
    setActiveSpaceTitle: (title: string) => setActiveSpaceTitle(title),
    setActiveSpaceId: (id: number) => setActiveSpaceId(id),
  };
};
