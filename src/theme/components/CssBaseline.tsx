import { Theme } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Components } from '@mui/material/styles/components';

const CssBaseline: Components<Omit<Theme, 'components'>>['MuiCssBaseline'] = {
  defaultProps: {},
  styleOverrides: {
    /* scrollbar */
    '::-webkit-scrollbar': {
      visibility: 'hidden',
      WebkitAppearance: 'none',
      width: 6,
      height: 6,
      backgroundColor: 'transparent'
    },

    '&::-webkit-scrollbar-track': {
      margin: 9
    },

    '&::-webkit-scrollbar-thumb': {
      visibility: 'hidden',
      borderRadius: 3,
      backgroundColor: grey[300]
    },

    '&:hover, &:focus': {
      '&::-webkit-scrollbar, &::-webkit-scrollbar-thumb': {
        visibility: 'visible'
      }
    }
  }
};

export default CssBaseline;
