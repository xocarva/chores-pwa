import { AlertColor } from '@mui/material';
import { create } from 'zustand';

export interface NotificationsState {
  open: boolean;
  message: string;
  severity: AlertColor;
  showNotification: (message: string, severity?: AlertColor) => void;
  hideNotification: () => void;
}

const useNotificationStore = create<NotificationsState>((set) => ({
  open: false,
  message: '',
  severity: 'info',
  showNotification: (message, severity) =>
    set({ open: true, message, severity }),
  hideNotification: () => set({ open: false, message: '' }),
}));

export default useNotificationStore;
