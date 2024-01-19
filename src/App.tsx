import { useTheme } from '@mui/material';
import AppBackdrop from 'components/common/AppBackdrop';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from 'services/firebase';
import { useAuthStore } from 'services/stores/useAuthStore';

const App = () => {
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  console.log({ theme: theme });
  const { setCurrentUser } = useAuthStore();

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);

  return (
    <>
      {loading ? <AppBackdrop open /> : <Outlet />}
      <ToastContainer
        transition={Slide}
        position="top-right"
        autoClose={4000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
      />
    </>
  );
};

export default App;
