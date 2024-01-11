import { findProfileSettings } from "../controllers/utility.js";
import { Router } from "express";

const router = Router();

router.get("/profile", findProfileSettings)

export default router