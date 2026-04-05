import express from "express";
import { getAllData,getAllDataByStaffId,getAllDataByStaffName } from "../Controllers/combinedControllers.js";

const combinedRoutes = express.Router();

combinedRoutes.get("/all",getAllData);
combinedRoutes.get("/allByStaffName",getAllDataByStaffName);
combinedRoutes.get("/:staffId",getAllDataByStaffId);

export {combinedRoutes}