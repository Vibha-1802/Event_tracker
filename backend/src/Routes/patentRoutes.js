import express from "express";
import {createPatent,getAllPatent,getPatentByStaffId,getPatentByStaffName} from "../Controllers/patentControllers.js";

const patentRoutes = express.Router();

patentRoutes.get("/allPatents",getAllPatent);
patentRoutes.get("/:staffId",getPatentByStaffId);
patentRoutes.get("/patentByStaffName",getPatentByStaffName);
patentRoutes.post("/newPatentRoutes",createPatent);

export {patentRoutes}