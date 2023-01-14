import * as fs from 'fs';
import { exec } from 'child_process'
/* 
  This implementation is horrifically hacky, sorry for anyone who reads this 
*/
let stream = null;
export const controlStream = async (req, res) => {
  const cmd = req.params.cmd;
  if (cmd === 'start') {
    //Start python script
    stream = exec('python image-processing/streamVid.py', (err, stdout, stderr) => {if (err) console.log(err)} )
    res.status(200).send({message: 'streaming started!'});
  } else if (cmd === 'end') {
    stream.kill('SIGINT');
    res.status(200).send({message: 'streaming ended!'});
  } else {
    res.end('invalid request')
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
let fileWatcher;
export const getDetections = (req,res) => {
  const cmd = req.params.cmd;

  if (cmd === 'start') {
    fileWatcher = fs.watch('./image-processing/data.txt', (eventType, filename) => {
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
  } else if (cmd === 'stop') {
    fileWatcher.close()
    res.end()
  } else {
    res.end('invalid request')
  }

}