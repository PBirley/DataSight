import React, { useEffect, useRef } from 'react'
import ReactPlayer from 'react-player'

export default function VideoPlayer({playing, rerender}) {
  const playerRef = useRef(null);
  useEffect(() => {
    console.log("Child component re-rendered");
    playerRef.current.seekTo(0);
  }, [rerender]);

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
