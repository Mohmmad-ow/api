import { createYear, deleteYear, findYear, findYears, updateYear } from "../controllers/year.js";
import {Router} from "express"

const router = Router();

router.get("/year/:id", findYear);

router.get("/all", findYears);

router.post("/create", createYear);

router.put("/year/update/:id", updateYear);

router.delete("/year/delete/:id", deleteYear);

export default router