import { Button, ButtonGroup } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getImg, startDetectionsOnStream, startStream, stopDetectionsOnStream, stopStream } from '../api-service';
import styles from './LiveStream.module.css';

export default function LiveStream() {
  const [analysedFrame, setAnalysedFrame] = useState(null);
  const [streamFlag, setStreamFlag] = useState(null);
  const dispatch = useDispatch();

  const handleStart = async () => {
    //TODO: Loading img needed while, whilst waiting for first img
    startStream()
    startDetectionsOnStream(dispatch)

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
    <ButtonGroup variant='contained'>
      <Button onClick={handleStart}>Start</Button>
      <Button onClick={handleStop}>Stop</Button>
      <Button>Clear Data</Button>
    </ButtonGroup>
    <img className='generic-container' src={analysedFrame} alt='waiting on frame'/>
</div>
  );
}
