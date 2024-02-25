import { GlobalSnackbarContainer } from './containers';
import AppRouter from './routes/AppRouter';

function App() {
  return (
    <>
      <GlobalSnackbarContainer />
      <AppRouter />
    </>
  );
}

export default App;
