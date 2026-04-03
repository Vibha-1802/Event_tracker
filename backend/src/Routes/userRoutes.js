import express from "express";
import {createUser,getObjectIdByStaffId,changePassword} from "../Controllers/userControllers.js";

const userRoutes = express.Router();

userRoutes.get("/objectIdByStaffId",getObjectIdByStaffId);
userRoutes.post("/newUser",createUser);
userRoutes.post("/newPassword",changePassword);

export {userRoutes}