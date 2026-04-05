import express from "express";
import { authenticate } from "../Middleware/authenticate.js";

const authenticateRoutes = express.Router()
authenticateRoutes.post("/", authenticate)
export { authenticateRoutes }