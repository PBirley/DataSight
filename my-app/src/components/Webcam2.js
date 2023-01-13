import React, { useState, useRef, useEffect } from 'react';
import { analyseFrame } from '../api-service';

export default function Webcam2() {
  const [analysedFrame, setAnalysedFrame] = useState(null);
  const [streamFlag, setStreamFlag] = useState(null);

  const handleStart = async () => {
    await fetch('http://localhost:4000/startStream')
    console.log('stream starting')

    setStreamFlag(setInterval(getImg, 100))
  };

  const handleStop = () => {
    if(streamFlag) clearInterval(streamFlag)
  }

  const getImg = async () => {
    const response = await fetch('http://localhost:4000/streamFrames');
    const { processedImg } = await response.json();
  
    setAnalysedFrame('data:image/jpeg;base64, ' + processedImg);
  }

  return (
  <div>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>

      <img src={analysedFrame} alt='waiting on frame'/>
  </div>
  );
}
