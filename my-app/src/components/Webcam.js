import React, { useState } from 'react';
import { getImg, startStream, stopStream, streamWebcamDetections } from '../api-service';

export default function Webcam() {
  const [analysedFrame, setAnalysedFrame] = useState(null);
  const [streamFlag, setStreamFlag] = useState(null);

  const handleStart = async () => {
    await startStream()
    setStreamFlag(setInterval(updateImg, 40))
  };

  const updateImg = async () => {
    const newImg = await getImg()
    if (newImg !== null) setAnalysedFrame(newImg);
  }

  const handleStop = async () => {
    if(streamFlag) {
      clearInterval(streamFlag)
      await stopStream()
    }
  };

  const startDetections = async () => streamWebcamDetections ()


return (
  <div key={100}>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={startDetections}>Start Detections</button>

      <img src={analysedFrame} resizeMode={"contain"} alt='waiting on frame'/>
  </div>
  );
}
