import { sampleData } from '../data/sample_data.js'
const videoPath = './data/output-long.mp4'
import * as fs from 'fs';

//change this to for loop that waits between sends
export const streamData = (req, res) => {
  try {
    const data = [...sampleData.slice(0)]
    for (let row of data) {
      const sendAt = row[0];
      const packet = JSON.stringify(row.slice(1));
      setTimeout(() => {
        res.write(packet)
        console.log(packet)
      }, sendAt);
    }
    setTimeout(() => {
      console.log('stream ended');
      res.end()
    }, data.slice(-1)[0][0]);
    return
  } catch (error) {
    console.log(error)
  }
}

/*
###############
mp4 from cv2 have wrong encoding or something, use this line to fix!!!!!!!!!!
//ffmpeg -i /path/to/original.mp4 -c:v libx264 -c:a aac -movflags +faststart -pix_fmt yuv420p /path/to/output.mp4
###############
*/
export const streamDemoVideo = (req,res) => {
  try {
    const range = req.headers.range
    if (!range)
        res.status(400).send('error')
  
    const videoSize = fs.statSync(videoPath).size
  
    const chunkSize = 10 ** 6
    // bytes=64165
    const start = Number(range.replace(/\D/g, ''))
    const end = Math.min(start + chunkSize, videoSize - 1)
    const contentLength = end - start + 1
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": 'bytes',
        "Content-Length": contentLength,
        "Content-Type": 'video/mp4'
    }
  
    res.writeHead(206, headers)
  
    const videoStream = fs.createReadStream(videoPath, { start, end })
  
    videoStream.pipe(res)
  } catch (error) {
    console.log(error);
  }
}
