import { Navigate, Outlet } from 'react-router-dom';
import paths from 'routes/paths';
import { useAuthStore } from 'services/stores/useAuthStore';

export const AuthProtectedRoute = () => {
  const { currentUser } = useAuthStore();

  return currentUser ? <Outlet /> : <Navigate to={paths.signin} />;
};

export const GuestProtectedRoute = () => {
  const { currentUser } = useAuthStore();

  return !currentUser ? <Outlet /> : <Navigate to="/" />;
};
