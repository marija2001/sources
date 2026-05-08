import express from "express";
import { getHomeServices, getTeamMembers } from "../controllers/contentCntrl.js";

const router = express.Router();

router.get("/home-services", getHomeServices);
router.get("/team", getTeamMembers);

export { router as contentRoute };
