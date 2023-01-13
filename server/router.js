import { Router } from "express";
import { streamData, streamDemoVideo } from "./controllers/emulateStream.js";
import { analyseFrame, startStream, streamFrames } from "./controllers/clientStream.js";

const router = Router();

router.get('/streamData', streamData);
router.get('/video', streamDemoVideo);
router.post('/userFrame', analyseFrame)
router.get('/startStream', startStream)
router.get('/streamFrames', streamFrames)

export default router;