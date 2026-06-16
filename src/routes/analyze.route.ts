import { Router } from "express";
import { analyzeProfile } from '../controllers/analyze.controller.js'

const router:Router = Router();

router.post("/:username", analyzeProfile);

export default router;