import express from "express";
import {createProfile,getAllProfile,getProfileByStaffId,getProfileByStaffName} from "../Controllers/profileControllers.js";

const profileRoutes = express.Router();

profileRoutes.get("/allProfiles",getAllProfile);
profileRoutes.get("/:staffId",getProfileByStaffId);
profileRoutes.get("/profileByStaffName",getProfileByStaffName);
profileRoutes.post("/newProfile",createProfile);

export {profileRoutes}