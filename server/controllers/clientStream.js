import * as fs from 'fs';
import { exec } from 'child_process'
 
export const startStream = (req, res) => {
  exec('python image-processing/streamVid.py', (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
  });
  res.status(200).send({message: 'streaming started!'});
}

export const streamFrames = (req, res) => {
  console.log('streaming frames');


  //Return img
  const result = fs.readFileSync('./image-processing/result.jpg')
  const encoded_string = new Buffer.from(result).toString('base64')

  res.status(200).json({ processedImg: encoded_string })
}


