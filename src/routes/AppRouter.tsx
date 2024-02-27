import { Routes, Route, Navigate } from 'react-router-dom';
import { SpacesPage, NotFound } from '../pages';
import { ProtectedRoute } from '../components';
import { useRedirect } from '../hooks';
import { AuthPage, useAuth } from '../auth';

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
        path="/spaces/*"
        element={
          <ProtectedRoute>
            <SpacesPage />
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
