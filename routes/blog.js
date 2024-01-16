import {  createBlog, deleteBlog, findBlog, findBlogs, updateBlog, findBlogsByCategory, findBlogsByProfile } from "../controllers/blog.js";
import { Router } from "express";

const router = Router();

router.post("/create", createBlog);

router.get("/all", findBlogs);

router.get("/blog/:id", findBlog);

router.put("/blog/update/:id", updateBlog);

router.delete("/blog/delete/:id", deleteBlog);


router.get("/blog/custom/homepage", findBlogsByCategory)


export default router