import express  from "express";
import { UserRepository } from "./database/user.repository.js";
import "dotenv/config";

const app = express();
app.use(express.json());

const userRepository = new UserRepository();

// GET - listar usuários
app.get("/user", async (req, res) => {
    try {
      const users = await userRepository.list();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Erro ao listar usuários", error });
    }
  });
  
  // POST - criar usuário
  app.post("/user", async (req, res) => {
    try {
      const createdUser = await userRepository.create(req.body);
      res.status(200).json(createdUser);
    } catch (error) {
      res.status(500).json({ message: "Erro ao criar usuário", error });
    }
  });
  
  
app.listen(process.env.PORT || 3000, () => {
    console.log(`🔥 Rodando na porta ${process.env.PORT || 3000}`);
  });
  