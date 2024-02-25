import { AlertColor } from '@mui/material';

export interface NotificationsState {
  open: boolean;
  message: string;
  severity: AlertColor;
  showNotification: (message: string, severity?: AlertColor) => void;
  hideNotification: () => void;
}
