import { Container, Grid, Typography } from '@mui/material'
import React from 'react'
import GraphDashComponent from './graphModules/GraphDashComponent'

export default function ReportPage({report}) {
  return (
    <React.Fragment>
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4}}>
      <Typography variant="h4">
        {report['reportTitle']}
      </Typography>
      <Typography variant="h6">
        {report['dateCreated']}
      </Typography>
      <Grid container spacing={3}style={{ display: 'flex', justifyContent: 'center' }}>
        <Grid item sx={{ display: 'flex', flexDirection: 'column'}}>
        </Grid>
        <GraphDashComponent data={report['data']} gender={true} ages={true} ethinicity={report['source'] === 'demo'? true: false}/>
      </Grid>
    </Container>
  </React.Fragment>
  )
}
