 import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import type { Preview } from '@storybook/react';
import theme from '../src/theme';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* Global CSS injection to automatically hide the watermark if found */}
        {/* <style>
          {`
            .MuiDataGrid-main > div:nth-child(3) {
              display: none !important;
            }
          `}
        </style>   */}
        <Story />
      </ThemeProvider>
    ),
  ],
};
//MUI-xlicense-key to replicate violaion  line 20 to 27

export default preview;