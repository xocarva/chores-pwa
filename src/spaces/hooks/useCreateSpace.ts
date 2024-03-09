import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UnauthorizedError, useNotificationStore } from '../../core';
import { CreateSpaceData } from '../schemas';
import { createSpace as createSpaceRequest } from '../api';
import { useSpacesStore } from '../stores';
import { useSpaces } from './useSpaces';
import { useUserStore } from '../../user';

export const useCreateSpace = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { showNotification } = useNotificationStore();
  const { spaces } = useSpaces();
  const navigate = useNavigate();

  const createSpace = async (spaceData: CreateSpaceData) => {
    setLoading(true);
    try {
      const space = await createSpaceRequest(spaceData);
      useSpacesStore.getState().setSpaces([...spaces, space]);

      showNotification('Espazo creado con éxito', 'success');
      navigate(`/spaces/${space.id}`);
    } catch (err) {
      if (err instanceof UnauthorizedError) {
        navigate('/login');
        useUserStore.getState().logout();
        showNotification('Sesión caducada', 'error');
      } else {
        setErrorMessage(
          `Houbo un erro creando o espazo: ${(err as Error).message}`
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    createSpace,
    loading,
    errorMessage,
  };
};
