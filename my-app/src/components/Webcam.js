import React, { useState, useRef, useEffect } from 'react';
import { analyseFrame } from '../api-service';

export default function Webcam() {
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const [analysedFrame, setAnalysedFrame] = useState(null);

  const handleStart = async () => {
    const constraints = { video: true };
    const newStream = await navigator.mediaDevices.getUserMedia(constraints);
    setStream(newStream);
    videoRef.current.srcObject = newStream;
    stopFlag = false;
  };

  let stopFlag = false;
  const handleStop = () => {
    stream.getTracks().forEach(track => track.stop());
    setStream(null);
    stopFlag = true
  };


  const canvasRef = useRef(null);

  const sendPhoto = async () => {
    console.log('sending photo');
    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    const imageData = canvasRef.current.toDataURL();

    const response = await analyseFrame(imageData);
    setAnalysedFrame('data:image/jpeg;base64, ' + response);

    // if (!stopFlag) sendPhoto()
  }

  // useEffect(() => {
  //   if (!stopFlag) sendPhoto()
  // }, [stopFlag, analysedFrame])

  return (
  <div>
      <video autoPlay={true}  ref={videoRef} />
      <canvas ref={canvasRef} width={320} height={240} />
      <div>
        <button onClick={handleStart}>Start</button>
        <button onClick={sendPhoto}>Capture</button>
        <button onClick={handleStop}>Stop</button>
      </div>
      <img src={analysedFrame} alt='waiting on frame'/>
  </div>
  );
}
