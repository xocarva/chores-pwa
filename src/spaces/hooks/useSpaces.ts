import { useEffect } from 'react';
import { api } from '../../core/api';
import { useSpacesStore } from '../stores';

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
