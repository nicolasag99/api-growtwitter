import { Router } from "express";
import { CommentController } from "../controllers/comment.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const commentController = new CommentController();
const commentRoutes = Router();

commentRoutes.post("/", authMiddleware, (req, res) =>
  commentController.createComment(req, res)
);
commentRoutes.get("/", authMiddleware, (req, res) =>
  commentController.listComments(req, res)
);
commentRoutes.get("/tweet/:tweetId", authMiddleware, (req, res) =>
  commentController.listCommentsByTweet(req, res)
);

export default commentRoutes;
