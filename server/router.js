import { Router } from "express";
import { streamDemoData, streamDemoVideo } from "./controllers/demoStream.js";
import { controlStream, getLatestFrame, getDetections } from "./controllers/liveStream.js";
import { addReport, deleteReport, getReports } from "./controllers/reports.js";

const router = Router();

router.get('/streamDemoData/:cmd', streamDemoData);
router.get('/demoVideo', streamDemoVideo);

router.get('/stream/:cmd', controlStream);
router.get('/getLatestFrame', getLatestFrame);
router.get('/getDetections/:cmd', getDetections);

router.get('/reports', getReports);
router.post('/report', addReport);
router.delete('/report/:id', deleteReport)

export default router;