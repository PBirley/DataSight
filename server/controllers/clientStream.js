import * as fs from 'fs';
import { exec } from 'child_process'

let stream = null;

export const startStream = (req, res) => {
  stream = exec('python image-processing/streamVid.py', (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
  });
  res.status(200).send({message: 'streaming started!'});

  fs.writeFile('./image-processing/write-read.txt', '1', (err) => {
    if (err) console.log(err)
  });
}

export const stopStream = (req, res) => {
  if (stream) {
    console.log('killing stream')
    stream.kill('SIGINT');
    res.status(200).send({message: 'streaming ended!'});
  } else {
    res.status(500).send({message: 'no stream running'})
  }
}

import {flock, constants, fcntl} from 'fs-ext';
let readFile = 0;

export const getLatestFrame = (req, res) => {

  // Not convinced this fs.access is doing anything
  // fs.access('./image-processing/result.jpg', fs.constants.F_OK, (err) => {
    // if (err) {
      // console.log(err);
      // res.status(200);
    // } else {
      //Return img
      const file = fs.openSync('./image-processing/'+ readFile +'.jpg', 'r');
      const result = fs.readFileSync('./image-processing/'+ readFile +'.jpg',)
      const encoded_string = new Buffer.from(result).toString('base64')
      res.status(200).json({ processedImg: encoded_string })

      fs.unlink('./image-processing/'+ readFile +'.jpg', err => {
        if (err) console.log(err)
      })

      readFile++
      if (readFile === 3) readFile = 0;
    // }
  // })
}


