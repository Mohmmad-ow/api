import { register, login } from "../controllers/user.js";
import { Router } from "express";

const router = Router();

router.post("/auth/create/", register)



router.post("/auth/login", login)


export default router