import { Router } from "express";
import { TwitteController } from "../controllers/twitte.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const twitteController = new TwitteController();
const twitteRoutes = Router();


twitteRoutes.post("/create/:id", authMiddleware, (req, res) =>
  twitteController.createTwitte(req, res)
);
twitteRoutes.get("/", authMiddleware, (req, res) =>
  twitteController.listAllTwittes(req, res)
);
twitteRoutes.post("/like", authMiddleware, (req, res) =>
  twitteController.likeTwitte(req, res)
);
twitteRoutes.get("/:userId", authMiddleware, (req, res) =>
  twitteController.listByUser(req, res)
);


export default twitteRoutes;
