import express from "express";
import {createPaper,getAllPaper,getPaperByStaffId,getPaperByStaffName} from "../Controllers/paperControllers.js";

const paperRoutes = express.Router();

paperRoutes.get("/allPapers",getAllPaper);
paperRoutes.get("/paperByStaffName",getPaperByStaffName);
paperRoutes.get("/:staffId",getPaperByStaffId);
paperRoutes.post("/newPaper",createPaper);

export {paperRoutes}