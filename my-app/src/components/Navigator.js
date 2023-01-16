import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import DemoPage from './DemoPage';
import DrawerModule from './responsiveDrawer/DrawerModule';
import AppBarModule from './responsiveDrawer/AppBarModule';
import { DrawerHeader } from './responsiveDrawer/DrawerModule';
import HomeDash from './HomeDash';
import BackendStreamPage from './BackendStreamPage';

export const drawerWidth = 240;

const startingState = {
  home: <HomeDash />,
  streams: [
    {name: 'Demo', component: <DemoPage />},
    {name: 'LiveStream_1', component: <BackendStreamPage />},
    // ['Demo', <DemoPage />],
    // ['LiveStream_1', <BackendStreamPage />]
  ],
  reports: [
    {name: 'Report 16/01/2022', component: <HomeDash />},
    {name: 'Report 13/01/2022', component: <HomeDash />},
  ]
}

export default function Navigator() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [dashViewer, setDashViewer] = React.useState(startingState)
  const [displayPage, setDisplayPage] = React.useState(dashViewer.home);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleStreamSelect = (clicked) => {
    console.log('stream selected', clicked);
    // const [dashName] = clicked
    const streamAndReports = [...dashViewer.streams, ...dashViewer.reports];
    if (clicked === 'Home') setDisplayPage(dashViewer.home);
    else {
      streamAndReports.filter(obj => {
        if (obj.name === clicked) setDisplayPage(obj.component)
      })
    }
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBarModule open={open}  handleDrawerOpen={handleDrawerOpen} />
      <DrawerModule dashViewer={dashViewer} handleDrawerClose={handleDrawerClose} handleStreamSelect={handleStreamSelect} open={open} theme={theme}/>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {displayPage}
      </Box>
    </Box>
  );
}