import { Router } from "express";
import { ReplyController } from "../controllers/reply.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const replyController = new ReplyController();
const replyRoutes = Router();

replyRoutes.post("/", authMiddleware, (req, res) =>
  replyController.createReplay(req, res)
);
replyRoutes.get("/replies", (req, res) => replyController.listReplies(req, res));


export default replyRoutes;