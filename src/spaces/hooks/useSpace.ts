import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UnauthorizedError, useNotificationStore } from '../../core';
import { useUserStore } from '../../user';
import { getSpace } from '../api';
import { useSpacesStore } from '../stores';

export const useSpace = (id: number) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { showNotification } = useNotificationStore();
  const navigate = useNavigate();
  const { currentSpace, setCurrentSpace } = useSpacesStore();

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    const fetchSpace = async () => {
      try {
        const fetchedSpace = await getSpace(id);
        setCurrentSpace(fetchedSpace);
        setErrorMessage('');
      } catch (err) {
        if (err instanceof UnauthorizedError) {
          navigate('/login');
          useUserStore.getState().logout();
          showNotification('Sesión caducada', 'error');
        } else {
          setErrorMessage(
            `Houbo un erro recuperando o espazo: ${(err as Error).message}`
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSpace();
  }, [setCurrentSpace, navigate, showNotification, id]);

  return {
    space: currentSpace,
    errorMessage,
    loading,
  };
};
