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

  // const startDetections = async () => streamWebcamDetections ()
  const startDetections = async () => {
    const response = await fetch('http://localhost:4000/getDetections/start');
    const reader = response.body.getReader();
  
    const read = async () => {
      const { done, value } = await reader.read();
  
      if (done) {
        console.log('All Data Recieved');
        return;
      }
      let chunk = new TextDecoder('utf-8').decode(value);
      chunk = JSON.parse(chunk);
      //Add the current time
      chunk.unshift(Date.now());
  
      console.log(chunk);
  
      read()
    };
    read()
  }
  const stopDetections = async () => {
    await fetch('http://localhost:4000/getDetections/stop');
  }


return (
  <div key={100}>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={startDetections}>Start Detections</button>
      <button onClick={stopDetections}>Stop Detections</button>

      <img src={analysedFrame} resizeMode={"contain"} alt='waiting on frame'/>
  </div>
  );
}
