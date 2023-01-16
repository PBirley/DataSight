import { Box, Grid, Paper, Typography } from '@material-ui/core';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { streamDemoDataStop } from '../api-service';
import { resetStreamData } from '../redux/actions';

export default function HomeDash({dashViewer}) {
  const dispatch = useDispatch();

  useEffect(() => {
    streamDemoDataStop();
    dispatch(resetStreamData());
  },[dispatch])
  
  return (
    <React.Fragment>
    <Grid container spacing={3}>
      {/* {dashViewer.streams.map((stream, index) => (
        <homeDashCard  key={stream.name}  text={stream.name}/>
      ))} */}
      <Grid item xs={12} sm={6} md={4}>
        <Paper sx={{height: 50}}>
          <Typography>
            Hello World
          </Typography>
        </Paper>       
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Paper>
          <Typography>
            Hello World
          </Typography>
        </Paper>       
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Paper>
          <Typography>
            Hello World
          </Typography>
        </Paper>       
      </Grid>
    </Grid>
    </React.Fragment>
  )
}

function homeDashCard ({text}) {
  return (
    <Grid item xs={12} sm={6} md={4}>
    <Paper>
      <Typography>
        {text}
      </Typography>
    </Paper>       
  </Grid>
  )
}
