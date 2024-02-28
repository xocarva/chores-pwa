import { useEffect } from 'react';
import { getSpaces } from '../api';
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
      const fetchedSpaces = await getSpaces();
      setSpaces(fetchedSpaces);
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
