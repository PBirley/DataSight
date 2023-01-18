import React, { useEffect, useRef } from 'react'
import ReactPlayer from 'react-player'

export default function DemoVideo({playing, restart}) {
  const playerRef = useRef(null);
  useEffect(() => {
    playerRef.current.seekTo(0);
  }, [restart]);

  return (
      <ReactPlayer 
        ref={playerRef}
        url='http://localhost:4000/demoVideo'
        playing={playing}
        controls={false}
        //needs to be muted to autoplay!
        muted={true}
        width="100%"
      />
  )
}
