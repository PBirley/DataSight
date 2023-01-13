import React, { useState } from 'react';
import { getImg, startStream, stopStream } from '../api-service';

export default function Webcam() {
  const [analysedFrame, setAnalysedFrame] = useState(null);
  const [streamFlag, setStreamFlag] = useState(null);

  const handleStart = async () => {
    await startStream()
    setStreamFlag(setInterval(updateImg, 100))
  };

  const updateImg = async () => setAnalysedFrame(await getImg());

  const handleStop = async () => {
    if(streamFlag) {
      clearInterval(streamFlag)
      await stopStream()
    }
  };
  

  return (
  <div key={100}>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>

      <img src={analysedFrame} resizeMode={"contain"} alt='waiting on frame'/>
  </div>
  );
}
