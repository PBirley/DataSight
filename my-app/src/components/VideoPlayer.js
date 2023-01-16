import React from 'react'
import ReactPlayer from 'react-player'

export default function VideoPlayer() {
  return (
      <ReactPlayer 
          url='http://localhost:4000/demoVideo'
          playing={true}
          controls={false}
          //needs to be muted to autoplay!
          muted={true}
          width="100%"
      />
  )
}
