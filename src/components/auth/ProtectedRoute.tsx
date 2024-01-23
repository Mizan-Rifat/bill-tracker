import useUsersFetch from 'hooks/firebase/useUsersFetch';
import { Navigate, Outlet } from 'react-router-dom';
import paths from 'routes/paths';
import { useAuthStore } from 'services/stores/useAuthStore';
import { useUsersStore } from 'services/stores/usersStore';

const AuthProtected = () => {
  const { isLoading, setIsLoading } = useUsersStore();
  useUsersFetch(setIsLoading);

  if (!isLoading) {
    return (
      <>
        <Outlet />
      </>
    );
  }
  return <></>;
};

export const AuthProtectedRoute = () => {
  const { currentUser } = useAuthStore();

  return currentUser ? <AuthProtected /> : <Navigate to={paths.signin} />;
};

export const GuestProtectedRoute = () => {
  const { currentUser } = useAuthStore();

  return !currentUser ? <Outlet /> : <Navigate to="/" />;
};
