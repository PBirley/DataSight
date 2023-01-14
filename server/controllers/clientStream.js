import * as fs from 'fs';
import { exec } from 'child_process'
/* 
  This implementation is horrifically hacky, sorry for anyone who reads this 
*/

let stream = null;
export const startStream = (req, res) => {
  stream = exec('python image-processing/streamVid.py', (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    // console.log(stdout);
  });
  res.status(200).send({message: 'streaming started!'});
}

export const stopStream = (req, res) => {
  if (stream) {
    console.log('killingStream');
    stream.kill('SIGINT');
    stopDetections = true;
    res.status(200).send({message: 'streaming ended!'});
  } else {
    res.status(500).send({message: 'no stream running'});
  }
}

let readImg = 0;
export const getLatestFrame = (req, res) => {
  try {
    const file = fs.openSync('./image-processing/'+ readImg +'.jpg', 'r');
    const result = fs.readFileSync('./image-processing/'+ readImg +'.jpg',)
    const encoded_string = new Buffer.from(result).toString('base64')
    res.status(200).json({ processedImg: encoded_string })

    fs.unlink('./image-processing/'+ readImg +'.jpg', err => {
      if (err) console.log(err)
    })

    //cycles trough the images to remove the possibility that read-write occurs at the same time
    readImg++
    if (readImg === 3) readImg = 0;
    
  } catch (error) {
    res.status(200).json({message: 'try again'});
  }
}

let last = null
let stopDetections = true
export const getDetections = (req,res) => {
  stopDetections = false
  fs.watch('./image-processing/data.txt', (eventType, filename) => {
    //exit condition
    if (stopDetections === true) return res.end();

    if (eventType === 'change') {
      fs.readFile('./image-processing/data.txt', 'utf-8', (err, data) => {
        if (err) console.log(err);
        
        if (data !== last) {
          console.log(data);
          res.write(data);
          last = data;
        }
      });
    }
  });
}