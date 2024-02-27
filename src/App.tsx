import { useUser } from './user';
import { AppRouter } from './routes';
import { NotificationContainer } from './core';
import { Header } from './layout';

function App() {
  const { userName, logout, isAuthenticated } = useUser();
  return (
    <>
      {isAuthenticated && <Header userName={userName} onLogout={logout} />}
      <NotificationContainer />
      <AppRouter />
    </>
  );
}

export default App;
