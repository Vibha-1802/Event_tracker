import express from "express";
import {createSocialService,getAllSocialService,getSocialServiceByStaffId,getSocialServiceByStaffName} from "../Controllers/socialServiceControllers.js";

const socialServiceRoutes = express.Router();

socialServiceRoutes.get("/allSocialServices",getAllSocialService);
socialServiceRoutes.get("/socialServiceByStaffName",getSocialServiceByStaffName);
socialServiceRoutes.get("/:staffId",getSocialServiceByStaffId);
socialServiceRoutes.post("/newSocialService",createSocialService)

export {socialServiceRoutes}