import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Tabs, Tab } from '@mui/material';
import { styles } from '../styles';

const Menu = () => {
  const location = useLocation();

  return (
    <Tabs 
      value={location.pathname}
      textColor="black"
      sx={styles.tabs}
    >
      <Tab 
        label="Главная" 
        component={Link} 
        to="/" 
        value="/" 
        sx={styles.tab} 
      />
      <Tab 
        label="Курсы" 
        component={Link} 
        to="/courses" 
        value="/courses" 
        sx={styles.tab} 
      />
      <Tab 
        label="Профиль" 
        component={Link} 
        to="/profile" 
        value="/profile" 
        sx={styles.tab} 
      />
    </Tabs>
  );
};

export default Menu;