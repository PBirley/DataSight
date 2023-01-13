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

export const getLatestFrame = (req, res) => {
  //Not convinced this fs.access is doing anything
  fs.access('./image-processing/result.jpg', fs.constants.F_OK, (err) => {
    if (err) {
      console.log(err);
      res.status(200);
    } else {
      //Return img
      const result = fs.readFileSync('./image-processing/result.jpg')
      const encoded_string = new Buffer.from(result).toString('base64')
      res.status(200).json({ processedImg: encoded_string })
    }
  })
}


