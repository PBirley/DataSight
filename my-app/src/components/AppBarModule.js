import { IconButton, styled, Toolbar, Typography } from '@material-ui/core';
import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';

export default function AppBarModule({open, handleDrawerOpen, AppBar}) {
  return (
    <AppBar position="fixed" open={open}>
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        sx={{
          marginRight: 5,
          ...(open && { display: 'none' }),
        }}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" noWrap component="div">
        DataSight
      </Typography>
      {/* <img className={styles.logo} src={logo} alt=''/> */}
    </Toolbar>
  </AppBar>
  )
}
