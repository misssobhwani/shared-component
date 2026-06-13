/// <reference types="vite/client" />
import React from 'react';
import type { Preview, Decorator } from '@storybook/react-vite';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { LicenseInfo } from '@mui/x-license';
import { theme } from '../src/theme/theme';

LicenseInfo.setLicenseKey(import.meta.env?.VITE_MUI_LICENSE_KEY ?? '');

const withMuiTheme: Decorator = (Story) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Story />
  </ThemeProvider>
);

const preview: Preview = {
  decorators: [withMuiTheme],
  parameters: {
    controls: { matchers: { color: /(background|color)$/i } },
  },
};

export default preview;
