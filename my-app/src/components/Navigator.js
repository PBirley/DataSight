import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addReports, resetStreamData } from '../redux/actions';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import DrawerModule from './responsiveDrawer/DrawerModule';
import AppBarModule from './responsiveDrawer/AppBarModule';
import { DrawerHeader } from './responsiveDrawer/DrawerModule';
import { getReports, streamDemoDataStop } from '../api-service';
import HomeDash from './Dashboards/HomeDash/HomeDash';
import StreamDashBoardWebcam from './Dashboards/StreamDashBoardWebcam';
import StreamDashBoardDemo from './Dashboards/StreamDashBoardDemo';
import ReportPage from './Dashboards/ReportPage';

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

  //On start get reports from Database
  React.useEffect(() => {
    getReports().then(response => response.json()).then( data => {
      dispatch(addReports(data));
    }).catch(err => console.log(err));
  },[])
  
  //When reports change update the homedash and side navigaation
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

  //
  const handleNavigation = (clicked) => {
    //Reset Demo Video data
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
        <HomeDash dashViewer={dashViewer} handleStreamSelect={handleNavigation} />
      </Box>
    </Box>
    )
  } else {
    return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBarModule open={open}  handleDrawerOpen={handleDrawerOpen} />
        <DrawerModule dashViewer={dashViewer} handleDrawerClose={handleDrawerClose} handleStreamSelect={handleNavigation} open={open} theme={theme}/>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          {displayPage}
        </Box>
      </Box>
    )
  }
}