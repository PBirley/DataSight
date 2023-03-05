import React, { useEffect, useState } from 'react'

export default function StreamDashBoardModularPy() {
  const [frameData, setFrameData] = useState(null);

  useEffect(() => {
    const stream = new EventSource('http://localhost:5000/video_feed');
    
    // stream.onmessage = function(event) {
    //   const frameData = JSON.parse(event.data);
    //   console.log(frameData);
    //   setFrameData(frameData)
    // }

    stream.addEventListener('message', event => {
      // const img = document.createElement('img');
      // img.src = `data:image/jpeg;base64,${event.data}`;
      console.log(`data:image/jpeg;base64,${event.data}`)
      setFrameData(`data:image/jpeg;base64,${event.data}`);

    })

    return () => stream.close();
  }, [])

  if (!frameData) {
    return <div>loading...</div>
  }

  return (
    <img src={frameData} alt='loading' />
  )
}
