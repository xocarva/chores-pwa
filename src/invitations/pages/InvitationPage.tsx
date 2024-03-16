import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CircularProgress, Grid } from '@mui/material';
import { useNotificationStore } from '../../core';
import { useUser } from '../../user';
import { useAcceptInvitation } from '../hooks';

function InvitationPage() {
  const { token } = useParams();
  const { isAuthenticated } = useUser();
  const { acceptInvitation, setInviteToken } = useAcceptInvitation();
  const { showNotification } = useNotificationStore();
  const navigate = useNavigate();

  useEffect(() => {
    const handleInvitation = async (t: string) => {
      if (isAuthenticated) {
        await acceptInvitation(t);
      } else {
        setInviteToken(t);
        navigate('/login');
      }
    };

    if (token) {
      handleInvitation(token);
    } else {
      showNotification('Erro procesando invitación', 'error');
      navigate('/spaces');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '100vh' }}
    >
      <CircularProgress />
    </Grid>
  );
}

export default InvitationPage;
