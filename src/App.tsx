import { ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/gl';
import { useUser } from './user';
import { AppRouter } from './routes';
import { NotificationContainer, theme } from './core';
import { Header } from './layout';

function App() {
  const { userName, logout, isAuthenticated } = useUser();
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="gl">
        {isAuthenticated && <Header userName={userName} onLogout={logout} />}
        <NotificationContainer />
        <AppRouter />
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
