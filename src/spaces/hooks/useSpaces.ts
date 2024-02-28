import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UnauthorizedError, useNotificationStore } from '../../core';
import { useUserStore } from '../../user';
import { getSpaces } from '../api';
import { useSpacesStore } from '../stores';

export const useSpaces = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { showNotification } = useNotificationStore();
  const navigate = useNavigate();
  const {
    spaces,
    setSpaces,
    setActiveSpaceId,
    activeSpaceId,
    activeSpaceTitle,
    setActiveSpaceTitle,
  } = useSpacesStore();

  useEffect(() => {
    setLoading(true);
    const fetchSpaces = async () => {
      try {
        const fetchedSpaces = await getSpaces();
        setSpaces(fetchedSpaces);
        setErrorMessage('');
      } catch (err) {
        if (err instanceof UnauthorizedError) {
          navigate('/login');
          useUserStore.getState().logout();
          showNotification('Sesión caducada', 'error');
        } else {
          setErrorMessage(
            `Houbo un erro recuperando os espazos: ${(err as Error).message}`
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSpaces();
  }, [setSpaces, navigate, showNotification]);

  return {
    spaces,
    activeSpaceId,
    activeSpaceTitle,
    setActiveSpaceTitle: (title: string) => setActiveSpaceTitle(title),
    setActiveSpaceId: (id: number) => setActiveSpaceId(id),
    errorMessage,
    loading,
  };
};
