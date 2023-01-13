import { Router } from "express";
import { streamData, streamDemoVideo } from "./controllers/emulateStream.js";

const router = Router();

router.get('/streamData', streamData);

router.get('/video', streamDemoVideo);

// import base64Img from 'base64-img';
import * as fs from 'fs';
// const fs = require('fs');

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

})

export default router;