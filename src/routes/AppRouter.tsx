import { Routes, Route, Navigate } from 'react-router-dom';
import { NotFound } from '../layout/pages';
import { LoginPage, RegisterPage, useUser } from '../user';
import { SpacesPage } from '../spaces';
import ProtectedRoute from './ProtectedRoute';

function AppRouter() {
  const { isAuthenticated } = useUser();

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/spaces" /> : <LoginPage />}
      />
      <Route
        path="/register"
        element={isAuthenticated ? <Navigate to="/spaces" /> : <RegisterPage />}
      />
      <Route
        path="/spaces"
        element={
          <ProtectedRoute>
            <SpacesPage />
          </ProtectedRoute>
        }
      >
        <Route path=":spaceId" element={<SpacesPage />} />
      </Route>
      <Route
        path="/"
        element={<Navigate to={isAuthenticated ? '/spaces' : '/login'} />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRouter;
