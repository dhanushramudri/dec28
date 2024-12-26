import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { GLOBAL_MUI_THEME } from '../styles/global.theme';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { ClerkProvider, useUser } from '@clerk/nextjs';
import { ResumeProvider } from '@/context/ResumeContext';
import HomePage from '.';

function AppContent(props: AppProps) {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <HomePage />;
  }

  return (
    <ResumeProvider userId={user.id}>
      <props.Component {...props.pageProps} />
    </ResumeProvider>
  );
}

export default function App(props: AppProps) {
  return (
    <ClerkProvider>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={GLOBAL_MUI_THEME}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <AppContent {...props} />
          </LocalizationProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </ClerkProvider>
  );
}
