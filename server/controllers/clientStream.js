import * as fs from 'fs';
import { exec } from 'child_process'
 
//needs to be made asynchonous
export const analyseFrame = async (req, res) => {
  let imageData = req.body.imageData;
  imageData = imageData.replace(/^data:image\/\w+;base64,/, '');
  const imageBuffer = new Buffer.from(imageData, 'base64');
  
  const filepath = './image-processing/image.jpg';
  fs.writeFile(filepath, imageBuffer, (err) => {
      if (err) {
          return res.status(500).json({ message: 'Error saving image' });
      }
  });
  
  //Activate python script on img
  exec('python image-processing/update_img.py', (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
  });

  //Return img
  const result = fs.readFileSync('./image-processing/result.jpg')
  const encoded_string = new Buffer.from(result).toString('base64')

  res.status(200).json({ processedImg: encoded_string })
}

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


