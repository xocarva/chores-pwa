import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ForbiddenError,
  UnauthorizedError,
  useNotificationStore,
} from '../../core';
import { useUserStore } from '../../user';
import { processInvitation as processInvitationRequest } from '../api';
import { useSpacesStore } from '../../spaces/stores';
import { useInvitationStore } from '../stores';

export const useAcceptInvitation = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { showNotification } = useNotificationStore();
  const navigate = useNavigate();
  const { setInviteToken } = useInvitationStore.getState();

  const acceptInvitation = async (token: string) => {
    setLoading(true);
    try {
      const { spaceId, spaces } = await processInvitationRequest(token);

      useSpacesStore.getState().setSpaces(spaces);
      useInvitationStore.getState().deleteInviteToken();

      showNotification('Espazo engadido', 'success');
      navigate(`/spaces/${spaceId}`);
    } catch (err) {
      if (err instanceof UnauthorizedError) {
        navigate('/login');
        useUserStore.getState().logout();
        showNotification('Sesión caducada', 'error');
      } else if (err instanceof ForbiddenError) {
        setErrorMessage('Token non válido');
        showNotification('Token non válido', 'error');
        navigate('/spaces');
      } else {
        setErrorMessage(
          `Houbo un erro engadindo o espazo: ${(err as Error).message}`
        );
        showNotification(
          `Houbo un erro engadindo o espazo: ${(err as Error).message}`,
          'error'
        );
        navigate('/spaces');
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    acceptInvitation,
    loading,
    errorMessage,
    setInviteToken,
  };
};
