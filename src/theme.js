import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { deepPurple, blue, grey } from '@mui/material/colors';

const customTheme = createTheme({
    palette: {
      primary: {
        main: blue[200],
        dark: blue[300]
      },
      secondary: {
        main: grey[100],
        dark: grey[900]
      }
    },
});

export default customTheme;