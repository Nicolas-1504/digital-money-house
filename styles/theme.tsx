import { createTheme } from "@mui/material";

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1600,
    },
  },
  typography: {
    fontFamily: "Open Sans, sans-serif",
    body1: {
      fontSize: "0.85rem",
      fontWeight: 400,
      lineHeight: 1.57,
    },
    body2: {
      fontSize: "0.8rem",
      fontWeight: 400,
      lineHeight: 1.57,
    },
    h1: {
      fontWeight: 700,
      fontSize: "2rem",
      lineHeight: 1.375,
    },
    h2: {
      fontWeight: 700,
      fontSize: "1.6rem",
      lineHeight: 1.375,
    },
    h3: {
      fontWeight: 700,
      fontSize: "1.4rem",
      lineHeight: 1.375,
    },
    h4: {
      fontWeight: 700,
      fontSize: "1.2rem",
      lineHeight: 1.375,
    },
    h5: {
      fontWeight: 600,
      fontSize: "1rem",
      lineHeight: 1.375,
    },
    h6: {
      fontWeight: 600,
      fontSize: "0.85rem",
      lineHeight: 1.35,
    },
  },
  palette: {
    grey: {
      100: "#EEEAEA", // secondary text
      200: "#CECECE", // secondary button (lo puse en secondary)
      300: "#AEADAD",
      400: "#808080", // placeholder
      500: "#4B4949",
      600: "#3A393E", // footer
      700: "#2A292C",
      800: "#201F22", // background
    },
    primary: {
      main: "#C1FD35",
      dark: "#9DCD2D",
      light: "rgba(193, 253, 53, 0.6)",
      contrastText: "#fff",
    },
    secondary: {
      main: "#CECECE",
    },
    error: {
      main: "#FF5050",
    },
  },
});
