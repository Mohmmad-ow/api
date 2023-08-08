import { register, login, logout } from "../controllers/user.js";
import { Router } from "express";

const router = Router();

router.post("/auth/create/", register)

router.post("/auth/login", login)

router.get("/auth/logout", logout)


export default router