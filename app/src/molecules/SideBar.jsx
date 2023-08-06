import Drawer from "../atom/Drawer";
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const SideBar = ({ toggleDrawer, open }) => {
  return (
    <>
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
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          <h4>option 1</h4>
          <h4>option 2</h4>
          <h4>option 3</h4>
          <Divider sx={{ my: 1 }} />
          <h4>other Options</h4>
        </List>
      </Drawer>
    </>
  );
};

export default SideBar;
