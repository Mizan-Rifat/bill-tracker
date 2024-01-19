import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from 'theme/theme.ts';
import { RouterProvider } from 'react-router-dom';
import router from 'routes/router.tsx';
import ConfirmationProvider from 'providers/ConfirmationProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ConfirmationProvider>
        <CssBaseline />
        <RouterProvider router={router} />
      </ConfirmationProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
