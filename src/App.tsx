import { GlobalSnackbarContainer } from './containers';
import { Header } from './components';
import { useAuth } from './auth';
import AppRouter from './routes/AppRouter';

function App() {
  const { userName, logout, isAuthenticated } = useAuth();
  return (
    <>
      {isAuthenticated && <Header userName={userName} onLogout={logout} />}
      <GlobalSnackbarContainer />
      <AppRouter />
    </>
  );
}

export default App;
