import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import DrawerModule from './responsiveDrawer/DrawerModule';
import AppBarModule from './responsiveDrawer/AppBarModule';
import { DrawerHeader } from './responsiveDrawer/DrawerModule';
import HomeDash from './HomeDash';
import StreamDashBoardWebcam from './StreamDashBoardWebcam';
import StreamDashBoardDemo from './StreamDashBoardDemo';
import { useDispatch, useSelector } from 'react-redux';
import { getReports, streamDemoDataStop } from '../api-service';
import { addReports, resetStreamData } from '../redux/actions';
import ReportPage from './ReportPage';

export const drawerWidth = 350;

const startingState = {
  streams: [
    {name: 'Demo', component: <StreamDashBoardDemo /> },
    {name: 'LiveStream_1', component: <StreamDashBoardWebcam /> },
  ],
  reports: []
}

export default function Navigator() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [dashViewer, setDashViewer] = React.useState(startingState)
  const [displayPage, setDisplayPage] = React.useState('Home');
  const dispatch = useDispatch();
  const reports = useSelector(state => state.reportData);

  React.useEffect(() => {
    getReports().then(response => response.json()).then( data => {
      dispatch(addReports(data));
    }).catch(err => console.log(err));
  },[])
  
  React.useEffect(()=>{
    const dashViewerCopy = {...dashViewer};
    dashViewerCopy['reports'] = [];
    for (const report of reports) {
      const dash = {
        id: report['_id'],
        name: report['reportTitle'] + ' ' + report['dateCreated'],
        component: <ReportPage report={report}/>
      }
      dashViewerCopy['reports'].push(dash);
    }
    setDashViewer(dashViewerCopy);
  }, [reports])


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleStreamSelect = (clicked) => {
    //Reset Redux on page change
    streamDemoDataStop();
    dispatch(resetStreamData('demo'));

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