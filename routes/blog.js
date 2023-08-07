import {  createBlog } from "../controllers/blog.js";
import { Router } from "express";

const router = Router();

router.post("/create", createBlog)


export default router