import { Router } from "express";
import { getAllProfiles, getProfile } from '../controllers/profile.controller.js'

const router:Router = Router();

router.get("/", getAllProfiles);
router.get("/:username", getProfile);

export default router;