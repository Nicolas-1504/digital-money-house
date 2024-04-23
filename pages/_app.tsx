import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import LayoutGeneral from "DMH/shared/layouts/LayoutGeneral";
import { theme } from "../styles/theme";
import { AuthProvider } from "DMH/context/auth/AuthContext";
import { AccountProvider } from "DMH/context/account/AccountContext";
import ActivityProvider from "DMH/context/activity/ActivityContext";

function MyApp({ Component, pageProps }: AppProps) {
  const LayoutComponent = (Component as any).Layout || LayoutGeneral;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <AccountProvider>
          <ActivityProvider>
            <LayoutComponent>
              <Component {...pageProps} />
            </LayoutComponent>
          </ActivityProvider>
        </AccountProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default MyApp;
