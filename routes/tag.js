import {  createTag, deleteTag, findTag, findTags, updateTag, findHomePageBlogsByTags } from "../controllers/tags.js";
import { Router } from "express";

const router = Router();

router.post("/create", createTag);

router.get("/all", findTags);

router.get("/tag/:id", findTag);

router.put("/tag/update/:id", updateTag);

router.delete("/tag/delete/:id", deleteTag);

router.get("/homepage/tags", findHomePageBlogsByTags);


export default router