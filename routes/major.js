import {  createMajor, deleteMajor, findMajor, findMajors, updateMajor,  } from "../controllers/major.js";
import { Router } from "express";

const router = Router();

router.post("/create", createMajor);

router.get("/all", findMajors);

router.get("/major/:id", findMajor);

router.put("/major/update/:id", updateMajor);

router.delete("/major/delete/:id", deleteMajor);


export default router