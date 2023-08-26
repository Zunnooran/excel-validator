import Drawer from "../atom/Drawer";
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

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
            <FontAwesomeIcon icon={faTimes} />
          </IconButton>
        </Toolbar>
        <Divider />

        <List>
          <Link to={"/validator"}
            underline="none"
            color="#fff"
            style={{ textDecoration: 'none' }}>
            <ListItem  >
              <ListItemText primary="Excel Validator" />
            </ListItem>
          </Link>
        </List>

        <Divider />

        <List>
          <Link to={"/"} underline="none"
            color="primary"
            style={{ textDecoration: 'none' }}>
            <ListItem button>
              <ListItemText primary="Chat Bot" />
            </ListItem>
          </Link>
        </List>
      </Drawer>
    ) : null
  );
};

export default SideBar;
