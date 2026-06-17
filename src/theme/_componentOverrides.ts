import { LinkProps } from '@mui/material/Link';

import LinkBehavior from './_LinkBehavior';
import palette from './_palette';
import backgroundImageUrl from '../assets/backgroundImageUrl';

// Update the Paper's variant prop options
declare module '@mui/material/Paper' {
  interface PaperPropsVariantOverrides {
    padded: true;
  }
}

const componentOverrides = {
  MuiButtonBase: {
    defaultProps: {
      LinkComponent: LinkBehavior,
    },
  },
  MuiContainer: {
    styleOverrides: {
      root: {
        paddingTop: '2rem',
        paddingBottom: '2rem',
      },
    },
  },
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        backgroundColor: '#dedede',
        backgroundImage: `url("${backgroundImageUrl}")`,
      },
    },
  },
  MuiDataGrid: {
    styleOverrides: {
      root: {
        '& .Mui-error': {
          color: palette.error.main,
        },
        '& .aggregated-value': {
          color: palette.primary.main,
          fontWeight: 'bold',
          background: 'none',
        },
        '& .MuiDataGrid-cell': {
          display: 'flex',
          alignItems: 'center',
        },
        '& .MuiDataGrid-aggregationColumnHeaderLabel': {
          display: 'none',
        },
        '& .MuiDataGrid-HeaderSoftAccent': {
          fontWeight: '600',
          background: '#F1F1F9',
        },
      },
    },
  },
  MuiLink: {
    defaultProps: {
      component: LinkBehavior,
    } as unknown as LinkProps,
  },
  MuiPaper: {
    variants: [
      {
        props: {
          variant: 'padded' as 'padded' | 'elevation' | 'outlined' | undefined,
        },
        style: {
          padding: '2rem',
        },
      },
    ],
  },
};

export default componentOverrides;
