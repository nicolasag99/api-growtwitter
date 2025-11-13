import { Router } from "express";
import { FollowController } from "../controllers/follow.controller.js";

const followController = new FollowController();
const followRoutes = Router();

followRoutes.post("/", (req, res) => followController.followUser(req, res))

export default followRoutes