import React, { useState, useRef } from 'react';

export default function Webcam() {
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);

  const handleStart = async () => {
    const constraints = { video: true };
    const newStream = await navigator.mediaDevices.getUserMedia(constraints);
    setStream(newStream);
    videoRef.current.srcObject = newStream;
  };

  const handleStop = () => {
    stream.getTracks().forEach(track => track.stop());
    setStream(null);
  };

  return (
    <div>
      <video ref={videoRef} style={{ width: '100%' }} autoPlay />
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
    </div>
  );
}
