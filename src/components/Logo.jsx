import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { styles } from '../styles';
import logo from '../assets/logo.ico';

const Logo = () => (
  <Link to="/" style={{ textDecoration: 'none' }}>
    <Box sx={styles.logoContainer}>
      <img src={logo} alt="Online Learning Logo" style={styles.logoImage} />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h5" sx={styles.logoText}>
          ONLINE
        </Typography>
        <Typography variant="h5" sx={styles.logoText}>
          LEARNING
        </Typography>
      </Box>
    </Box>
  </Link>
);

export default Logo;