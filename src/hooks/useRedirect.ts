import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRedirectStore } from '../stores/useRedirectStore';

export const useRedirect = () => {
  const navigate = useNavigate();
  const redirectPath = useRedirectStore((state) => state.redirectPath);
  const setRedirectPath = useRedirectStore((state) => state.setRedirectPath);

  useEffect(() => {
    if (redirectPath) {
      navigate(redirectPath);
      setRedirectPath('');
    }
  }, [navigate, redirectPath, setRedirectPath]);
};
