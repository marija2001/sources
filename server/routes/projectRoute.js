import express from "express";
import { createProject, getAllProjects, getProjectById } from "../controllers/resdCntrl.js";
import jwtCheck from "../config/auth0Config.js";
const router = express.Router();


router.post("/create", jwtCheck, createProject)
router.get("/allprj", getAllProjects)
router.get("/:id", getProjectById)
export {router as projectRoute}