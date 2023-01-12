import React from 'react'
import ReactPlayer from 'react-player'
import style from './VideoPlayer.module.css'

export default function VideoPlayer() {
  return (
    <div className={style.videoPlayerContainer}>
      <ReactPlayer 
          url='http://localhost:4000/video'
          playing={true}
          controls={false}
          //needs to be muted to autoplay!
          muted={true}
          width="100%"
      />
    </div>
  )
}
