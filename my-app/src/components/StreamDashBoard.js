import React from 'react'
import PieChartGenders from './graphModules/PieChartGenders'
import PieChartEthnicities from './graphModules/PieChartEthnicities';
import BarChartAges from './graphModules/BarChartAges';
import LineGraphPeoplePerPeroid from './graphModules/LineGraphPeoplePerPeroid';
import { Container } from '@mui/system';
import { Button, ButtonGroup, Grid, Paper, Typography } from '@mui/material';

export default function StreamDashBoard({Video}) {
  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4}}>
        <Grid container spacing={3}style={{ display: 'flex', justifyContent: 'center' }}>
          <Grid item>
            <Paper sx={{display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ p: 2}}>
                DemoVideo
              </Typography>
              {Video}
              <ButtonGroup sx={{ p: 2}}>
                <Button size="small" color="primary">Start</Button>
                <Button size="small" color="primary">Stop</Button>
                <Button size="small" color="primary">Create Report</Button>
                <Button size="small" color="secondary">Clear Data</Button>
              </ButtonGroup>
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
