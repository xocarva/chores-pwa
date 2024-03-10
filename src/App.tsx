import { ThemeProvider } from '@mui/material';
import { useUser } from './user';
import { AppRouter } from './routes';
import { NotificationContainer, theme } from './core';
import { Header } from './layout';

function App() {
  const { userName, logout, isAuthenticated } = useUser();
  return (
    <ThemeProvider theme={theme}>
      {isAuthenticated && <Header userName={userName} onLogout={logout} />}
      <NotificationContainer />
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
