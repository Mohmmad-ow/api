import { createLike, findLike } from "../controllers/like.js";
import { Router } from "express";

const router = Router();


router.get("/like/:id", findLike)
router.post("/like/:id/create", createLike);


export default router