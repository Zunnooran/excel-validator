import * as React from 'react';
import AppBarMolecule from '../molecules/AppBarMolecule';
import SideBar from '../molecules/SideBar';
import Section from '../molecules/Section';
import { Toolbar, Typography, Box, CssBaseline } from '@mui/material';

import Container from '@mui/material/Container';

import Link from '@mui/material/Link';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


export default function Dashboard({ currentTheme, handleThemeToggle }) {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBarMolecule 
        toggleDrawer={toggleDrawer} 
        currentTheme={currentTheme} 
        handleThemeToggle={handleThemeToggle} 
        open={open} 
        />
        <SideBar
        toggleDrawer={toggleDrawer} 
        open={open} 
        />

        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Section />
            </Container>
            </Box>
            </Box>
            <Copyright/>
    </>
  );
}