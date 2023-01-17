import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getImg, startDetectionsOnStream, startStream, stopDetectionsOnStream, stopStream } from '../api-service';
import { Container } from '@mui/system';
import { Button, ButtonGroup, Grid, Paper, Typography } from '@mui/material';
import GraphDashComponent from './graphModules/GraphDashComponent';


export default function StreamDashBoardWebcam({Video}) {

  const [analysedFrame, setAnalysedFrame] = useState(null);
  const [streamFlag, setStreamFlag] = useState(null);
  const dispatch = useDispatch();

  const handleStart = async () => {
    //TODO: Loading img needed while, whilst waiting for first img
    startStream()
    startDetectionsOnStream(dispatch)

    //Stream is in fact series of images 
    setStreamFlag(setInterval(getLatestFrame, 50))
  };

  const getLatestFrame = async () => {
    const newImg = await getImg()
    if (newImg !== null) setAnalysedFrame(newImg);
  }

  const handleStop = async () => {
    if(streamFlag) {
      await stopDetectionsOnStream();
      clearInterval(streamFlag)

      //TODO: Function doesn't work, python script doesnt end
      await stopStream()
    }
  };

  return (
    <React.Fragment>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4}}>
        <Grid container spacing={3}style={{ display: 'flex', justifyContent: 'center' }}>
          <Grid item>
            <Paper sx={{display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ p: 2}}>
                LiveStream_1
              </Typography>
              <img src={analysedFrame} alt='waiting on frame'/>
              <ButtonGroup sx={{ p: 2}}>
                <Button onClick={handleStart} size="small" color="primary">Start</Button>
                <Button onClick={handleStop} size="small" color="primary">Stop</Button>
                <Button size="small" color="primary">Create Report</Button>
                <Button size="small" color="secondary">Clear Data</Button>
              </ButtonGroup>
            </Paper>
          </Grid>
          <GraphDashComponent/>
        </Grid>
      </Container>
    </React.Fragment>
  )
}
