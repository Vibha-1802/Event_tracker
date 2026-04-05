import express from "express";
import { changeStatusPaper,changeStatusPatent,getOnHoldPapers,getOnHoldPatents } from "../Controllers/adminControllers.js";

const adminRoutes = express.Router();

adminRoutes.post("/statusPaper",changeStatusPaper);
adminRoutes.post("/statusPatent",changeStatusPatent);
adminRoutes.get("/onHoldPapers", getOnHoldPapers);
adminRoutes.get("/onHoldPatents", getOnHoldPatents);

export {adminRoutes}