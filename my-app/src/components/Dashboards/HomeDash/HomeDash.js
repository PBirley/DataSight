import { Box, Button, Grid, Typography } from '@material-ui/core';
import React, { useEffect } from 'react'
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ReportsDashCard from './ReportDashCard';
import StreamsDashCard from './StreamsDashCard';


export default function HomeDash({dashViewer, handleStreamSelect}) {

  useEffect(() => {
    console.log('dashviewer changed');
  }, [dashViewer])
  
  return (
    <React.Fragment>
      <Typography variant="h4">Streams</Typography>
      <Grid container spacing={3}>
        {dashViewer.streams.map((stream, index) => (
              <StreamsDashCard  key={stream.name} handleStreamSelect={handleStreamSelect} text={stream.name} icon={<CenterFocusWeakIcon />}/>
        ))}
      </Grid>
      <Box sx={{ m: 2}} />
      <Button variant="contained" color='primary'>
        Add new stream
      </Button>
      <Box sx={{ m: 2}} />
      <Typography variant="h4">Reports</Typography>
      <Grid container spacing={3}>
        {dashViewer.reports.map((report, index) => (
              <ReportsDashCard  key={report.name} dbId={report.id} handleStreamSelect={handleStreamSelect} text={report.name} icon={<AssessmentIcon />}/>
        ))}
      </Grid>
    </React.Fragment>
  )
}

