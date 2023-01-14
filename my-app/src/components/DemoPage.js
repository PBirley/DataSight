import React from 'react'
import DataDashboard from './DataDashboard'
import VideoPlayer from './VideoPlayer'

export default function DemoPage() {
  return (
    <div>
      <VideoPlayer />
      <DataDashboard />
    </div>
  )
}
