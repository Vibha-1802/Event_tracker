import express from "express";
import {createFdp,getAllFdp,getFdpByStaffId,getFdpByStaffName} from "../Controllers/fdpControllers.js";

const fdpRoutes = express.Router();

fdpRoutes.get("/allFdps",getAllFdp);
fdpRoutes.get("/:staffId",getFdpByStaffId);
fdpRoutes.get("/fdpByStaffName",getFdpByStaffName);
fdpRoutes.post("/newFdp",createFdp);

export {fdpRoutes}