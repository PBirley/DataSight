import React, { useState } from 'react';
import { getImg, startDetectionsOnStream, startStream, stopDetectionsOnStream, stopStream } from '../api-service';
import styles from './LiveStream.module.css';

export default function LiveStream() {
  const [analysedFrame, setAnalysedFrame] = useState(null);
  const [streamFlag, setStreamFlag] = useState(null);

  const handleStart = async () => {
    //TODO: Loading img needed while, whilst waiting for first img
    startStream()
    startDetectionsOnStream()

    //Stream is in fact series of images 
    setStreamFlag(setInterval(getLatestFrame, 50))
  };

  const getLatestFrame = async () => {
    const newImg = await getImg()
    if (newImg !== null) setAnalysedFrame(newImg);
  }

  const handleStop = async () => {
    if(streamFlag) {
      await stopDetectionsOnStream();
      clearInterval(streamFlag)

      //TODO: Function doesn't work, python script doesnt end
      await stopStream()
    }
  };


return (
  <div className={styles.container}>
    <div>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
    </div>
    <img class='generic-container' src={analysedFrame} resizeMode={"contain"} alt='waiting on frame'/>
</div>
  );
}
