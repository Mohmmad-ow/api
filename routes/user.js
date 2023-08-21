import { register, login, logout, findClientUser } from "../controllers/user.js";
import { Router } from "express";
import { verifyToken } from "../util/verifyToken.js";

const router = Router();

router.post("/auth/create/", register)

router.post("/auth/login", login)

router.get("/auth/logout", logout)

router.get('/auth/findClientUser',verifyToken, findClientUser);

export default router