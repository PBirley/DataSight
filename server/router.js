import { Router } from "express";
import { streamData, streamDemoVideo } from "./controllers/emulateStream.js";
import { analyseFrame } from "./controllers/clientStream.js";

const router = Router();

router.get('/streamData', streamData);
router.get('/video', streamDemoVideo);
router.post('/userFrame', analyseFrame)

export default router;