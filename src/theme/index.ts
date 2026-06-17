import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import palette from './_palette';
import typography from './_typography';
import componentOverrides from './_componentOverrides';

let theme = createTheme({
  palette,
  typography,
  shape: {
    borderRadius: 0,
  },
  transitions: {
    duration: {
      shortest: 100,
      shorter: 150,
      short: 200,
      standard: 250,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
  components: componentOverrides,
});
theme = responsiveFontSizes(theme);

export default theme;
