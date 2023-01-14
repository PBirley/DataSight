import { Router } from "express";
import { streamData, streamDemoVideo } from "./controllers/emulateStream.js";
import { startStream, stopStream, getLatestFrame, getDetections } from "./controllers/clientStream.js";

const router = Router();

router.get('/streamData', streamData);
router.get('/video', streamDemoVideo);
router.get('/startStream', startStream);
router.get('/stopStream', stopStream);
router.get('/getLatestFrame', getLatestFrame);
router.get('/getDetections/:cmd', getDetections);

export default router;