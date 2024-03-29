import { useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useNotificationStore } from '../stores';

function NotificationContainer() {
  const { open, message, severity, hideNotification } = useNotificationStore();

  useEffect(() => {
    if (open) {
      setTimeout(() => hideNotification(), 3000);
    }
  }, [open, hideNotification]);

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={hideNotification}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      style={{ marginTop: '100px' }}
    >
      <Alert
        onClose={hideNotification}
        severity={severity}
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export default NotificationContainer;
