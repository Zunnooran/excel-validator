import Drawer from "../atom/Drawer";
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';

const SideBar = ({ toggleDrawer, open }) => {
  return (
    open ? (
    <Drawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      >
        <IconButton onClick={toggleDrawer}>
         X
        </IconButton>
      </Toolbar>
      <Divider />

      <List>
        <ListItem button>
          <ListItemText primary="Option 1" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Option 2" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Option 3" />
        </ListItem>
      </List>

      <Divider />

      <List>
        <ListItem button>
          <ListItemText primary="Chat Bot" />
        </ListItem>
      </List>
    </Drawer>
        ) : null
  );
};

export default SideBar;
