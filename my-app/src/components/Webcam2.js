import React, { useState, useRef, useEffect } from 'react';
import { analyseFrame } from '../api-service';

export default function Webcam2() {
  const [analysedFrame, setAnalysedFrame] = useState(null);
  const [streamFlag, setStreamFlag] = useState(null);

  const handleStart = async () => {
    await fetch('http://localhost:4000/startStream')
    console.log('stream starting')

    setStreamFlag(setInterval(getImg, 100))

    // watchFile()
  };

  async function watchFile () {
    const response = await fetch('http://localhost:4000/fileWatch');
    const reader = response.body.getReader();

    const read = async () => {
      const { done, value } = await reader.read();
  
      if (done) {
        console.log('All Data Recieved');
        return;
      }

      let img = new TextDecoder('utf-8').decode(value)
      console.log(img);
      setAnalysedFrame(img);
  
      read()
    };
    read()
  }

  const handleStop = () => {
    if(streamFlag) clearInterval(streamFlag)
  }

  const getImg = async () => {
    const response = await fetch('http://localhost:4000/streamFrames');
    const { processedImg } = await response.json();

    console.log(processedImg);
  
    setAnalysedFrame('data:image/jpeg;base64, ' + processedImg);
  }

  return (
  <div key={100}>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>

      <img src={analysedFrame} resizeMode={"contain"} alt='waiting on frame'/>
  </div>
  );
}
