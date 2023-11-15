import { createTheme } from "@mui/material";

export const customTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900, // Customize your breakpoints as needed
      lg: 1450,
      xl: 1980,
    },
  },
});
