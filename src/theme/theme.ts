import { createTheme } from '@mui/material';
import CssBaseline from './components/CssBaseline';

export const theme = createTheme({
  // typography: {
  //   fontFamily: ['Plus Jakarta Sans', 'sans-serif'].join(',')
  // }
  components: {
    MuiCssBaseline: CssBaseline,
    MuiButton: {
      defaultProps: {
        size: 'small',
        variant: 'contained',
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        size: 'small',
      },
    },
  },
});
