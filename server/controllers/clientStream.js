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

export const fileWatch = (req, res) => {
  fs.watch('./image-processing/result.jpg', (eventType, filename) => {
    if (eventType === 'change') {
      fs.access('./image-processing/result.jpg', fs.constants.F_OK, (err) => {
        if (err) {
          console.log('file not accessible')
        } else {
          console.log('file accessible');
      
          const result = fs.readFileSync('./image-processing/result.jpg')
          const encoded_string = new Buffer.from(result).toString('base64')
          //const base64Image = new Buffer.from(result, 'binary').toString('base64');
          // console.log(encoded_string);
          res.status(200).write('data:image/jpeg;base64, ' + encoded_string);
        }
      })
    }
  })
}

export const streamFrames = (req, res) => {
  console.log('streaming frames');

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


