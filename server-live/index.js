// const NodeMediaServer = require('node-media-server');
// import cors from 'cors';

// const fs = require('fs');
// if (!fs.existsSync('./media/london-walking-25fps_1.mp4')) {
//     console.log("File not found!");
// }
// else {
//   console.log('File found!')
// }

// const config = {
//     rtmp: {
//         port: 1935,
//         chunk_size: 60000,
//         gop_cache: true,
//         ping: 30,
//         ping_timeout: 60
//     },
//     http: {
//         port: 8000,
//         mediaroot: './media/london-walking-25fps_1.mp4',
//         allow_origin: '*'
//     },
//     trans: {
//         ffmpeg: '/usr/bin/ffmpeg',
//         tasks: [
//           {
//               app: 'live',
//               hls: true,
//               hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]'
//           }
//         ]
//     }
// };

// var nms = new NodeMediaServer(config)
// nms.run();




const express = require("express");
const app = express();
const fs = require("fs");

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/video", function (req, res) {
  // Ensure there is a range given for the video
  const range = req.headers.range;
  if (!range) {
    res.status(400).send("Requires Range header");
  }

  // get video stats (about 61MB)
  const videoPath = "./media/sample.mp4";
  const videoSize = fs.statSync(videoPath).size;

  // Parse Range
  // Example: "bytes=32324-"
  const CHUNK_SIZE = 10 ** 6; // 1MB
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  // Create headers
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  // HTTP Status 206 for Partial Content
  res.writeHead(206, headers);

  // create video read stream for this particular chunk
  const videoStream = fs.createReadStream(videoPath, { start, end });

  // Stream the video chunk to the client
  videoStream.pipe(res);
});

app.listen(8000, function () {
  console.log("Listening on port 8000!");
});