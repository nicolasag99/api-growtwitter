import { Router } from "express";
import { FollowController } from "../controllers/follow.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const followController = new FollowController();
const followRoutes = Router();

followRoutes.post("/", authMiddleware, (req, res) =>
  followController.followUser(req, res)
);

export default followRoutes