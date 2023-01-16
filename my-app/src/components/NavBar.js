import React from 'react'
import logo from '../images/logo.svg';
import styles from './NavBar.module.css';
import { AppBar, IconButton, Toolbar } from '@material-ui/core';
import MenuIcon from '@mui/icons-material/Menu';


export default function NavBar() {
  return (
    <div>
      <AppBar position='static' color='white'>
        <Toolbar variant='dense'>
          <IconButton edge='start' color='inherit' aria-label='menu' sx={{ mr:2 }}>
            <MenuIcon />
          </IconButton>
          <img className={styles.logo} src={logo} alt=''/>
        </Toolbar>
      </AppBar>

    </div>
  )
}
