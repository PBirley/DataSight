import React from 'react'
import PieChartGenders from './graphModules/PieChartGenders'
import PieChartEthnicities from './graphModules/PieChartEthnicities';
import BarChartAges from './graphModules/BarChartAges';
import LineGraphPeoplePerPeroid from './graphModules/LineGraphPeoplePerPeroid';
import { Container } from '@mui/system';
import { Grid, Paper, Typography } from '@mui/material';
import ReactPlayer from 'react-player';

export default function StreamDashBoard({Video}) {
  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2}}>
            <Typography >
              DemoVideo
            </Typography>
            {Video}
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <LineGraphPeoplePerPeroid />
            </Paper>
          </Grid>
          <Grid item>
            <Paper sx={{
              height: 240,
              p:2,
              display: 'flex',
              flexDirection: 'column'
              }}>
              <PieChartGenders />
            </Paper>
          </Grid>
          <Grid item>
          <Paper sx={{
              p:2,
              height: 240,
              width: 400,
              display: 'flex',
              flexDirection: 'column'
              }}>
              <BarChartAges />
            </Paper>
          </Grid>
          <Grid item>
          <Paper sx={{
              p:2,
              height: 240,
              display: 'flex',
              flexDirection: 'column'
              }}>
              <PieChartEthnicities />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}
