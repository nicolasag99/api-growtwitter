import express from "express";
import dotenv from "dotenv";
import { TwitteRepository } from "./database/twitte.repository.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import twitteRoutes from "./routes/twitte.routes.js";
import followRoutes from "./routes/follow.routes.js";
import replyRoutes from "./routes/reply.routes.js";

import cors from "cors";

dotenv.config({ override: true });

const app = express();

app.use(express.json());
app.use(cors());

app.use("/user", userRoutes);
app.use("/auth", authRoutes);
app.use("/twitte", twitteRoutes);
app.use("/follow", followRoutes);
app.use("/reply", replyRoutes);

const twitteRepository = new TwitteRepository();

app.listen(process.env.PORT, () => {
  console.log(`Rodando na porta ${process.env.PORT}`);
});