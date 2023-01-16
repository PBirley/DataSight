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
import StreamDashBoard from './StreamDashBoard';
import VideoPlayer from './VideoPlayer';
import LiveStream from './LiveStream';

export const drawerWidth = 240;

const startingState = {
  streams: [
    {name: 'Demo', component: <DemoPage Video={<VideoPlayer />} /> },
    {name: 'LiveStream_1', component: <BackendStreamPage /> },
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
  const [displayPage, setDisplayPage] = React.useState('Home');

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleStreamSelect = (clicked) => {
    const streamAndReports = [...dashViewer.streams, ...dashViewer.reports];
    if (clicked === 'Home') setDisplayPage('Home');
    else {
      streamAndReports.filter(obj => {
        if (obj.name === clicked) setDisplayPage(obj.component)
      })
    }
  }

  
    if (displayPage === 'Home') {
      return (
        <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBarModule />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <HomeDash dashViewer={dashViewer} handleStreamSelect={handleStreamSelect} />
        </Box>
      </Box>
      )
    } else {
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
      )
    }
}