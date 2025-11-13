import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";

const userController = new UserController();
const userRoutes = Router();

// Rota GET para listar todos os usuários

userRoutes.post("/login", (req, res) => userController.login(req, res));
userRoutes.get("/", (req, res) => userController.listAllUser(req, res));
userRoutes.get("/:id", (req, res) => userController.listUser(req, res));
userRoutes.post("/", (req, res) => userController.creteUser(req, res));
userRoutes.patch("/:id", (req, res) => userController.updateUser(req, res));


export default userRoutes;
