import React from 'react'
import ReactPlayer from 'react-player'

export default function VideoPlayer({playing}) {
  return (
      <ReactPlayer 
          url='http://localhost:4000/demoVideo'
          playing={playing}
          controls={false}
          //needs to be muted to autoplay!
          muted={true}
          width="100%"
      />
  )
}
