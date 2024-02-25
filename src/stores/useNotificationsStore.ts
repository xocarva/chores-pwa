import { create } from 'zustand';
import { NotificationsState } from '../types';

const useNotificationStore = create<NotificationsState>((set) => ({
  open: false,
  message: '',
  severity: 'info',
  showNotification: (message, severity) =>
    set({ open: true, message, severity }),
  hideNotification: () => set({ open: false, message: '' }),
}));

export default useNotificationStore;
