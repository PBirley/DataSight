import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { streamDemoDataStart } from '../api-service';
import StreamDashBoard from './StreamDashBoard';
import VideoPlayer from './VideoPlayer'

export default function DemoPage() {
  const dispatch = useDispatch();

  //On page render begin streaming the data
  useEffect(() => {
    streamDemoDataStart(dispatch);
  },[dispatch])
  
  return (
    <div>
      {/* <VideoPlayer /> */}
      <StreamDashBoard Video={<VideoPlayer />} />
    </div>
  )
}
