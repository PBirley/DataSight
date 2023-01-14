import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { streamDemoDataStart } from '../api-service';
import DataDashboard from './DataDashboard'
import VideoPlayer from './VideoPlayer'

export default function DemoPage() {
  const dispatch = useDispatch();

  //On page render begin streaming the data
  useEffect(() => {
    streamDemoDataStart(dispatch);
  },[dispatch])
  
  return (
    <div>
      <VideoPlayer />
      <DataDashboard />
    </div>
  )
}
