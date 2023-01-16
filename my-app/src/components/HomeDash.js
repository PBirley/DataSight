import { Box, Button, Card, CardActions, CardContent, Grid, Paper, Typography } from '@material-ui/core';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { streamDemoDataStop } from '../api-service';
import { resetStreamData } from '../redux/actions';
import CenterFocusWeakIcon from '@mui/icons-material/CenterFocusWeak';
import AssessmentIcon from '@mui/icons-material/Assessment';


export default function HomeDash({dashViewer, handleStreamSelect}) {
  const dispatch = useDispatch();

  useEffect(() => {
    streamDemoDataStop();
    dispatch(resetStreamData());
  },[dispatch])
  
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
              <ReportsDashCard  key={report.name}  text={report.name} icon={<AssessmentIcon />}/>
        ))}
      </Grid>
    </React.Fragment>
  )
}

function StreamsDashCard ({text, icon, handleStreamSelect}) {
  function elementClicked () {
    handleStreamSelect(text);
  }
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card >
        <CardContent>
          {icon}
          <Typography variant="h6">{text}</Typography>
        </CardContent>
        <CardActions>
          <Button onClick={elementClicked} size="small" color="primary">
            View Stream
          </Button>
          <Button size="small" color="primary">
            Create Report
          </Button>
          <Button size="small" color="secondary">
            Delete
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

function ReportsDashCard ({text, icon}) {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card >
        <CardContent>
          {icon}
          <Typography variant="h6">{text}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            View Report
          </Button>
          <Button size="small" color="secondary">
            Delete
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}
