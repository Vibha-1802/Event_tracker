import express from "express";
import {createPatent,getAllPatent,getPatentByStaffId,getPatentByStaffName} from "../Controllers/patentControllers.js";

const patentRoutes = express.Router();

patentRoutes.get("/allPatents",getAllPatent);
patentRoutes.get("/patentByStaffName",getPatentByStaffName);
patentRoutes.get("/:staffId",getPatentByStaffId);
patentRoutes.post("/newPatent",createPatent);

export {patentRoutes}