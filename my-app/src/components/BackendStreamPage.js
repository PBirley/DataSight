import React from 'react'
// import DataDashboard from './DataDashboard'
import DataDashboardModular from './DataDashboardMoudlar'
import LiveStream from './LiveStream.js'
// import {Button} from '@mui/material/Button';

export default function BackendStreamPage() {
  return (
    <div>
      {/* <Button variant="contained">Hello World</Button> */}
      <LiveStream />
      <DataDashboardModular />
    </div>
  )
}
