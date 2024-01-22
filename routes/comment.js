import {createComment, deleteComment, getBlogsComments,getComments, updateComment} from "../controllers/comments.js"
import { Router } from "express";

const router = Router();

router.post("/blog/:id/comments/create", createComment);

router.get("/all", getComments);

router.get("/blog/:id/comments", getBlogsComments);

router.put("/blog/comments/update/:id", updateComment);

router.delete("/blog/comments/delete/:id", deleteComment);




export default router