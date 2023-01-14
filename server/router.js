import { Router } from "express";
import { streamData, streamDemoVideo } from "./controllers/emulateStream.js";
import { controlStream, getLatestFrame, getDetections } from "./controllers/clientStream.js";

const router = Router();

router.get('/streamData', streamData);
router.get('/video', streamDemoVideo);

router.get('/stream/:cmd', controlStream);
router.get('/getLatestFrame', getLatestFrame);
router.get('/getDetections/:cmd', getDetections);

export default router;