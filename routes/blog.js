import {  createBlog, deleteBlog, findBlog, findBlogs, updateBlog } from "../controllers/blog.js";
import { Router } from "express";

const router = Router();

router.post("/create", createBlog);

router.get("/all", findBlogs);

router.get("/blog/:id", findBlog);

router.put("/blog/update/:id", updateBlog);

router.delete("/blog/delete/:id", deleteBlog);


export default router