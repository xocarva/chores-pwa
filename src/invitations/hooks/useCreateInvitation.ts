import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UnauthorizedError, useNotificationStore } from '../../core';
import { useUserStore } from '../../user';
import { createInvitation as createInvitationRequest } from '../api';

export const useCreateInvitation = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { showNotification } = useNotificationStore();
  const navigate = useNavigate();

  const fallbackCopyTextToClipboard = (text: string): void => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      const successful = document.execCommand('copy');
      const msg = successful
        ? 'Copiouse a url da invitación no portapapeis'
        : 'Fallback: Houbo un erro ao copiar';
      showNotification(msg, `${successful ? 'success' : 'error'}`);
    } catch (err) {
      setErrorMessage('Fallback: Houbo un erro ao copiar');
    } finally {
      document.body.removeChild(textarea);
      setLoading(false);
    }
  };

  const createInvitation = async (spaceId: number) => {
    setLoading(true);
    try {
      const url = await createInvitationRequest(spaceId);
      try {
        await navigator.clipboard.writeText(url);
        showNotification(
          'Copiouse a url da invitación no portapapeis',
          'success'
        );
      } catch (err) {
        console.error('Clipboard API failed, using fallback', err);
        fallbackCopyTextToClipboard(url);
      }
    } catch (err) {
      if (err instanceof UnauthorizedError) {
        navigate('/login');
        useUserStore.getState().logout();
        showNotification('Sesión caducada', 'error');
      } else {
        const errMessage = `Houbo un erro creando o token: ${
          (err as Error).message
        }`;
        setErrorMessage(errMessage);
        showNotification(errMessage, 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    createInvitation,
    loading,
    errorMessage,
  };
};
