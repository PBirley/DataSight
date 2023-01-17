import React from 'react'
import PieChartGenders from './PieChartGenders'
import PieChartEthnicities from './PieChartEthnicities';
import BarChartAges from './BarChartAges';
import LineGraphPeoplePerPeroid from './LineGraphPeoplePerPeroid';
import { Grid, Paper } from '@mui/material';

export default function GraphDashComponent({data, ethinicity=false, ages=false, gender=false}) {
  return (
    <React.Fragment>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <LineGraphPeoplePerPeroid data={data}/>
        </Paper>
      </Grid>
      {gender && (
        <Grid item>
          <Paper sx={{height: 240, p:2, display: 'flex', flexDirection: 'column'}}>
            <PieChartGenders data={data}/>
          </Paper>
        </Grid>
      )}
      {ages && (
        <Grid item>
        <Paper sx={{p:2, height: 240, width: 400, display: 'flex', flexDirection: 'column' }}>
            <BarChartAges data={data}/>
          </Paper>
        </Grid>
      )}
      {ethinicity && (
        <Grid item>
          <Paper sx={{p:2, height: 240, display: 'flex', flexDirection: 'column'}}>
            <PieChartEthnicities data={data}/>
          </Paper>
        </Grid>
      )}
    </React.Fragment>
  )
}
