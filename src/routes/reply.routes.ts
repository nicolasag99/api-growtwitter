import { Router } from "express";
import { ReplyController } from "../controllers/reply.controller.js";

const replyController = new ReplyController();
const replyRoutes = Router();

replyRoutes.post("/", (req, res) => replyController.createReplay(req, res));
replyRoutes.get("/replies", (req, res) => replyController.listReplies(req, res));


export default replyRoutes;