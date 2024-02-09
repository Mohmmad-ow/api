import { findProfileSettings, findSettings, updateSettingsUser } from "../controllers/utility.js";
import { Router } from "express";

const router = Router();

router.get("/profile", findProfileSettings);
router.get("/settings", findSettings);
router.put("/settings/:id", updateSettingsUser)

export default router