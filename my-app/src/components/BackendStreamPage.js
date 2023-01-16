import React from 'react'
import DataDashboard from './DataDashboard'
// import DataDashboardModular from './DataDashboardMoudlar'
import LiveStream from './LiveStream.js'

export default function BackendStreamPage() {
  return (
    <div>
      <LiveStream />
      <DataDashboard />
    </div>
  )
}
