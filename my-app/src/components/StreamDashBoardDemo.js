import React, { useState } from 'react'
import { Container } from '@mui/system';
import { Button, ButtonGroup, Grid, Paper, Typography } from '@mui/material';
import GraphDashComponent from './graphModules/GraphDashComponent';
import { useDispatch, useSelector } from 'react-redux';
import { addReportToDb, streamDemoDataStart, streamDemoDataStop } from '../api-service';
import VideoPlayer from './VideoPlayer';
import { resetStreamData } from '../redux/actions';

export default function StreamDashBoardDemo() {
  
  const dispatch = useDispatch();
  const [playing, setPlaying] = useState(false);
  const [rerender, setRerender] = useState(false);
  
  
  const handlePlay = () => {
    setPlaying(true);
    streamDemoDataStart(dispatch);
  }
  
  const handleRestart = () => {
    streamDemoDataStop();
    dispatch(resetStreamData('demo'));
    setRerender(prevRender => !prevRender);
    setPlaying(false);
  }

  const handleClear = () => {
    dispatch(resetStreamData('demo'));
  }

  const generateReport = () => addReportToDb('Demo Report','demo',demoData)

  const demoData = useSelector(state => state.streamingData.demo)
  
  return (
    <React.Fragment>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4}}>
        <Grid container spacing={3}style={{ display: 'flex', justifyContent: 'center' }}>
          <Grid item>
            <Paper sx={{display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ p: 2}}>
                DemoVideo
              </Typography>
              <VideoPlayer playing={playing}  rerender={rerender}/>
              <ButtonGroup sx={{ p: 2}}>
                <Button onClick={handlePlay} size="small" color="primary">Start</Button>
                <Button onClick={handleRestart} size="small" color="primary">Restart</Button>
                <Button onClick={generateReport} size="small" color="primary">Create Report</Button>
                <Button onClick={handleClear} size="small" color="secondary">Clear Data</Button>
              </ButtonGroup>
            </Paper>
          </Grid>
          <GraphDashComponent data={demoData} gender={true} ages={true} ethinicity={true}/>
        </Grid>
      </Container>
    </React.Fragment>
  )
}
