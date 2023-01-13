// import React, { useEffect, useState } from 'react';
// import socketIOClient from "socket.io-client";

// export const WebsocketsStream = () => {
//   const [socket] = useState(() => socketIOClient('http://localhost:8000'));
//   const [frame, setFrame] = useState(null);
//   const videoRef = React.createRef();

//   useEffect(() => {
//     socket.on('connect', () => {
//       console.log('Connected to the server.');
//     });

//     socket.on('disconnect', () => {
//       console.log('Disconnected from the server.');
//     });

//     socket.on('frame', data => {
//       setFrame(data);
//     });
//   }, [socket]);

//   useEffect(() => {
//     if (frame && videoRef.current) {
//       const objectUrl = URL.createObjectURL(new Blob([frame], { type: 'image/jpeg' }));
//       videoRef.current.src = objectUrl;
//     }
//   }, [frame, videoRef]);

//   return (
//     <div>
//       <video ref={videoRef} autoPlay={true} />
//     </div>
//   );
// };
