import { Router } from "express";
import { TwitteController } from "../controllers/twitte.controller.js";

const twitteController = new TwitteController();
const twitteRoutes = Router();


twitteRoutes.post("/create/:id", (req, res) => twitteController.createTwitte(req, res));
twitteRoutes.get("/", (req, res) => twitteController.listAllTwittes(req, res));
twitteRoutes.post("/like", (req, res) => twitteController.likeTwitte(req, res));


export default twitteRoutes;
