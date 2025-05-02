import React from 'react';
import { AppBar, Toolbar, Box } from '@mui/material';
import { styles } from '../styles';
import Logo from './Logo';
import Menu from './Menu';

const Header = () => (
  <AppBar position="static" sx={styles.header}>
    <Toolbar sx={styles.toolbar}>
      <Logo />
      <Box sx={styles.menuContainer}>
        <Menu />
      </Box>
    </Toolbar>
  </AppBar>
);

export default Header;