import express from "express";
import { getAllData,getAllDataByStaffId,getAllDataByStaffName } from "../Controllers/combinedControllers.js";

const combinedRoutes = express.Router();

combinedRoutes.get("/allPapers",getAllData);
combinedRoutes.get("/paperByStaffName",getAllDataByStaffName);
combinedRoutes.get("/:staffId",getAllDataByStaffId);

export {combinedRoutes}