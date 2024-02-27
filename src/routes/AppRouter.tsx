import { Routes, Route, Navigate } from 'react-router-dom';
import { useRedirect } from '../core';
import { NotFound } from '../layout/pages';
import { AuthPage, useUser } from '../user';
import { SpacesPage } from '../spaces';
import ProtectedRoute from './ProtectedRoute';

function AppRouter() {
  const { isAuthenticated } = useUser();
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
