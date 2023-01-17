import React from 'react'
import PieChartGenders from './PieChartGenders'
import PieChartEthnicities from './PieChartEthnicities';
import BarChartAges from './BarChartAges';
import LineGraphPeoplePerPeroid from './LineGraphPeoplePerPeroid';
import { Grid, Paper } from '@mui/material';

export default function GraphDashComponent({ethinicity=false}) {
  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <LineGraphPeoplePerPeroid />
        </Paper>
      </Grid>
      <Grid item>
        <Paper sx={{height: 240, p:2, display: 'flex', flexDirection: 'column'}}>
          <PieChartGenders />
        </Paper>
      </Grid>
      <Grid item>
       <Paper sx={{p:2, height: 240, width: 400, display: 'flex', flexDirection: 'column' }}>
          <BarChartAges />
        </Paper>
      </Grid>
      {ethinicity && (
        <Grid item>
          <Paper sx={{p:2, height: 240, display: 'flex', flexDirection: 'column'}}>
            <PieChartEthnicities />
          </Paper>
        </Grid>
      )}
    </React.Fragment>
  )
}
