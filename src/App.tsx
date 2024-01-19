import { useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';

const App = () => {
  const theme = useTheme();
  console.log({ theme: theme });

  return (
    <>
      <Outlet />
    </>
  );
};

export default App;
