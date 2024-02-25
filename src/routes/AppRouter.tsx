import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthPage, Spaces, NotFound } from '../pages';
import { ProtectedRoute } from '../components';
import { useAuth, useRedirect } from '../hooks';

function AppRouter() {
  const { isAuthenticated } = useAuth();
  useRedirect();

  return (
    <Routes>
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/spaces" />
          ) : (
            <AuthPage formType="login" />
          )
        }
      />
      <Route
        path="/register"
        element={
          isAuthenticated ? (
            <Navigate to="/spaces" />
          ) : (
            <AuthPage formType="register" />
          )
        }
      />
      <Route
        path="/spaces"
        element={
          <ProtectedRoute>
            <Spaces />
          </ProtectedRoute>
        }
      />
      <Route
        path="/"
        element={<Navigate to={isAuthenticated ? '/spaces' : '/login'} />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRouter;