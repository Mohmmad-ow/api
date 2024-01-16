import {  createProfile, findProfiles, findProfile, updateProfile, deleteProfile, findProfileById } from "../controllers/profile.js";
import { Router } from "express";

const router = Router();

router.post("/create", createProfile);

router.get("/all", findProfiles);

router.get("/profile/:id", findProfileById);

router.get("/profile/v2/myprofile", findProfile);

router.put("/profile/update/", updateProfile);

router.delete("/profile/delete/:id", deleteProfile);


export default router
