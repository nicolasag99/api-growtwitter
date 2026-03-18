import { Router } from "express";
import { TwitteController } from "../controllers/twitte.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const twitteController = new TwitteController();
const twitteRoutes = Router();


twitteRoutes.post("/create/:id", (req, res) => twitteController.createTwitte(req, res));
twitteRoutes.get("/", (req, res) => twitteController.listAllTwittes(req, res));
twitteRoutes.post("/like", authMiddleware, (req, res) =>
  twitteController.likeTwitte(req, res)
);
twitteRoutes.get("/:userId", (req, res) => twitteController.listByUser(req, res));


export default twitteRoutes;
