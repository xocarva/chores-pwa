import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ChoresLogo } from '../../core';

interface HeaderProps {
  userName: string | null;
  onLogout: () => void;
}

function Header({ userName, onLogout }: HeaderProps) {
  return (
    <AppBar position="static" sx={{ paddingY: 1.5 }}>
      <Toolbar>
        <ChoresLogo grow color="white" />
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
