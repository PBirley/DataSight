import { Router } from "express";
import { streamDemoData, streamDemoVideo } from "./controllers/demoStream.js";
import { controlStream, getLatestFrame, getDetections } from "./controllers/liveStream.js";

const router = Router();

router.get('/streamDemoData/:cmd', streamDemoData);
router.get('/demoVideo', streamDemoVideo);

router.get('/stream/:cmd', controlStream);
router.get('/getLatestFrame', getLatestFrame);
router.get('/getDetections/:cmd', getDetections);

export default router;