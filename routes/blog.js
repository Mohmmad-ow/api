import {  createBlog, deleteBlog, findBlog, findBlogs, updateBlog, updateBlogTags,getBlogTags,findBlogsBySearch } from "../controllers/blog.js";
import { Router } from "express";

const router = Router();

router.post("/create", createBlog);

router.get("/all", findBlogs);

router.get("/blog/:id", findBlog);

router.put("/blog/update/:id", updateBlog);

router.delete("/blog/delete/:id", deleteBlog);

router.post("/experiment", findBlogsBySearch);
router.post("/blog/:id/add_tags", updateBlogTags);
router.get("/blog/:id/add_tags", getBlogTags);

export default router