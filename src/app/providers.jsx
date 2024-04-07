"use client";

import { AuthProvider } from "@/context/AuthContext";
import {
  StyledEngineProvider,
  createTheme,
  ThemeProvider,
} from "@mui/material/styles";

import { black } from "@mui/material/colors";

const { palette } = createTheme();
const theme = createTheme({
  palette: {
    black: palette.augmentColor({
      color: {
        main: "#000000"
      }
    })
  },
});

export function Providers({ children }) {
  return (
    <StyledEngineProvider>
      <ThemeProvider theme={theme}>
        <AuthProvider>{children}</AuthProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
