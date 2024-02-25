import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItemText,
  Button,
  ListItemButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';

const drawerWidth = 240;

interface NavBarProps {
  elements: {
    id: number;
    title: string;
  }[];
  onAddElement: () => void;
  activeElementTitle: string;
  title: string;
  addElementLabel: string;
  onElementClick: (id: number, title: string) => void;
}

function NavBar({
  elements,
  onAddElement,
  activeElementTitle,
  title,
  addElementLabel,
  onElementClick,
}: NavBarProps) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {title}
            {activeElementTitle ? ` / ${activeElementTitle}` : ''}
          </Typography>
          <Button
            color="inherit"
            startIcon={<AddIcon />}
            onClick={onAddElement}
            sx={{ marginLeft: 'auto' }}
          >
            {addElementLabel}
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        <List>
          {elements?.map((element) => (
            <ListItemButton
              key={element.id}
              onClick={() => {
                onElementClick(element.id, element.title);
                handleDrawerToggle();
              }}
            >
              <ListItemText primary={element.title} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </>
  );
}

export default NavBar;
