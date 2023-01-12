import React from 'react'
import ReactPlayer from 'react-player'


export default function VideoPlayer() {
  return (
    <div >
      <ReactPlayer
          url='http://localhost:4000/video'
          playing={true}
          controls={true}
      />
    </div>
  )
}
