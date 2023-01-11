import { Router } from "express";
import { streamData } from "./controllers/emulateStream.js";
const router = Router();

router.get('/streamData', streamData);

export default router;