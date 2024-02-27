import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface HeaderProps {
  userName: string | null;
  onLogout: () => void;
}

function Header({ userName, onLogout }: HeaderProps) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Chores
        </Typography>
        {userName && (
          <>
            <IconButton color="inherit">
              <AccountCircleIcon />
            </IconButton>

            <Typography
              variant="subtitle1"
              component="div"
              sx={{ marginRight: 2 }}
            >
              {userName}
            </Typography>
            <Button color="inherit" onClick={onLogout}>
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
