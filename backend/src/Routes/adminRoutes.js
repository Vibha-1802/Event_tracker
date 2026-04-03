import express from "express";
import {changeStatusPaper,changeStatusPatent} from "../Controllers/adminControllers.js";

const adminRoutes = express.Router();

adminRoutes.post("/statusPaper",changeStatusPaper);
adminRoutes.post("/statusPatent",changeStatusPatent);

export {adminRoutes}