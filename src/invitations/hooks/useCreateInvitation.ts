import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UnauthorizedError, useNotificationStore } from '../../core';
import { useUserStore } from '../../user';
import { createInvitation as createInvitationRequest } from '../api';

export const useCreateInvitation = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [manualCopyDialogOpen, setManualCopyDialogOpen] = useState(false);
  const [invitationUrl, setInvitationUrl] = useState<string>('');
  const { showNotification } = useNotificationStore();
  const navigate = useNavigate();

  const createInvitation = async (spaceId: number) => {
    setLoading(true);
    try {
      const url = await createInvitationRequest(spaceId);
      setInvitationUrl(url);
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        showNotification(
          'Copiouse a url da invitación no portapapeis',
          'success'
        );
      } else {
        setManualCopyDialogOpen(true);
      }
    } catch (err) {
      if (err instanceof UnauthorizedError) {
        navigate('/login');
        useUserStore.getState().logout();
        showNotification('Sesión caducada', 'error');
      } else {
        setErrorMessage(
          `Houbo un erro creando o token: ${(err as Error).message}`
        );
        showNotification(
          `Houbo un erro creando o token: ${(err as Error).message}`,
          'error'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    createInvitation,
    loading,
    errorMessage,
    manualCopyDialogOpen,
    setManualCopyDialogOpen,
    invitationUrl,
  };
};
