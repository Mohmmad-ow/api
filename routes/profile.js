import {  createProfile, findProfiles, findProfile, updateProfile, deleteProfile } from "../controllers/profile.js";
import { Router } from "express";

const router = Router();

router.post("/create", createProfile);

router.get("/all", findProfiles);

router.get("/profile/myprofile", findProfile);

router.put("/profile/update/", updateProfile);

router.delete("/profile/delete/:id", deleteProfile);


export default router
