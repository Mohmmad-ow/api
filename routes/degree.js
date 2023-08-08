import {  createDegree, deleteDegree, findDegree, findDegrees, updateDegree } from "../controllers/degree.js";
import { Router } from "express";

const router = Router();

router.post("/create", createDegree);

router.get("/all", findDegrees);

router.get("/degree/:id", findDegree);

router.put("/degree/update/:id", updateDegree);

router.delete("/degree/delete/:id", deleteDegree);


export default router