import { Router } from "express";
import { streamData, streamDemoVideo } from "./controllers/emulateStream.js";
import { fileWatch, startStream, streamFrames } from "./controllers/clientStream.js";

const router = Router();

router.get('/streamData', streamData);
router.get('/video', streamDemoVideo);
router.get('/startStream', startStream)
router.get('/fileWatch', fileWatch)
router.get('/streamFrames', streamFrames)

export default router;