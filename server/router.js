import { Router } from "express";
import { streamData, streamDemoVideo } from "./controllers/emulateStream.js";

const router = Router();

router.get('/streamData', streamData);

router.get('/video', streamDemoVideo);

export default router;