import React from 'react'
import DataDashboardModular from './DataDashboardMoudlar'
import LiveStream from './LiveStream.js'

export default function BackendStreamPage() {
  return (
    <div>
      <LiveStream />
      <DataDashboardModular />
    </div>
  )
}
