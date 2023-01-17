import { Container, Grid } from '@mui/material'
import React from 'react'
import GraphDashComponent from './graphModules/GraphDashComponent'

export default function ReportPage({data}) {
  return (
    <React.Fragment>
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4}}>
      <Grid container spacing={3}style={{ display: 'flex', justifyContent: 'center' }}>
        <GraphDashComponent data={data} gender={true} ages={true} ethinicity={false}/>
      </Grid>
    </Container>
  </React.Fragment>
  )
}
