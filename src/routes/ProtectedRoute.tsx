import { Navigate } from 'react-router-dom';
import { useUser } from '../user';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useUser();
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

export default ProtectedRoute;
