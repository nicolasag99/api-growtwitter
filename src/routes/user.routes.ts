import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const userController = new UserController();
const userRoutes = Router();

userRoutes.get("/", authMiddleware, (req, res) =>
  userController.listAllUser(req, res)
);
userRoutes.get("/:id", authMiddleware, (req, res) =>
  userController.listUser(req, res)
);
userRoutes.post("/", (req, res) => userController.creteUser(req, res));
userRoutes.patch("/:id", authMiddleware, (req, res) =>
  userController.updateUser(req, res)
);


export default userRoutes;
