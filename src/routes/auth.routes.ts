import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const authController = new AuthController();
const authRoutes = Router();

authRoutes.post("/login", (req, res) => authController.login(req, res));
authRoutes.post("/logout", authMiddleware, (req, res) =>
  authController.logout(req, res)
);

export default authRoutes;
