import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import DemoPage from './DemoPage';
import DrawerModule from './DrawerModule';
import AppBarModule from './AppBarModule';
import { DrawerHeader } from './DrawerModule';

export const drawerWidth = 240;

export default function ResponsiveDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBarModule open={open}  handleDrawerOpen={handleDrawerOpen} />
      <DrawerModule handleDrawerClose={handleDrawerClose} open={open} theme={theme}/>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <DemoPage />
      </Box>
    </Box>
  );
}