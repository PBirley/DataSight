import { Router } from "express";
import { streamData, streamDemoVideo } from "./controllers/emulateStream.js";

const router = Router();

router.get('/streamData', streamData);

router.get('/video', streamDemoVideo);

import * as fs from 'fs';
import { exec } from 'child_process'
 
router.post('/userFrame', (req, res) => {
  let imageData = req.body.imageData;
  imageData = imageData.replace(/^data:image\/\w+;base64,/, '');
  const imageBuffer = new Buffer.from(imageData, 'base64');

  const filepath = './image-processing/image.jpg';
  fs.writeFile(filepath, imageBuffer, (err) => {
      if (err) {
          return res.status(500).json({ message: 'Error saving image' });
      }
      res.json({ message: 'Image saved successfully' });
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

})

export default router;