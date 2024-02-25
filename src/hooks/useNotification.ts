import { useNotificationStore } from '../stores';

export const useNotification = () => {
  const showNotification = useNotificationStore(
    (state) => state.showNotification
  );
  const hideNotification = useNotificationStore(
    (state) => state.hideNotification
  );

  return { showNotification, hideNotification };
};
