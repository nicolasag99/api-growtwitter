import express  from "express";
import { UserRepository } from "./database/user.repository.js";
import "dotenv/config";
import { handlerError } from "./config/error.config.js";
import { TwitteRepository } from "./database/twitte.repository.js";
import { LikeRepository } from "./database/like.repository.js";

const app = express();
app.use(express.json());

const userRepository = new UserRepository();
const twitteRepository = new TwitteRepository();
const likeRepository = new LikeRepository();

  // GET - listar usuários
  app.get("/user", async (req, res) => {
      try {
        const users = await userRepository.list();
        return res.status(200).send({
          ok: true,
          message: "Usuário criado com sucesso",
          data: users
      })
      } catch (error) {
        res.status(500).json({ message: "Erro ao listar usuários", error });
      }
    });
  
  // POST - criar usuário
  app.post("/user", async (req, res) => {

    try {

      const result = await userRepository.create(req.body);

      return res.status(200).send({
          ok: true,
          message: "Usuário criado com sucesso",
          data: result
      })
      
    } catch (error: any) {
        res.status(500).json({ message: "Erro ao criar usuário", error });
      }

  });

  // UPDATE - atualizar usuário

  app.patch("/user/:id", async (req, res) => {
    try {
      const { id } = req.params || req.query;
      const data = req.body;

      const patchUser = await userRepository.update(id, data);
      return res.status(200).send({
        ok: true,
        message: "Usuário atualizado com sucesso",
        data: patchUser
    })
    } catch (error) {
      res.status(500).json({message: "Erro ao atualizar o usuário", error});
    }
  })

  // ROTAS TWITTE

  //CRIAR TWITTE
  app.post("/twitte/:id", async (req, res) => {

    try {
      const { id } = req.params
      const data = req.body;
      const twitte = await twitteRepository.create(data);

      return res.status(200).send({
        ok: true,
        message: "Twitte criado com sucesso",
        data: twitte
      })

    } catch (error: any) {
      console.error("Erro ao criar twitte:", error);
      return res.status(500).send({
        ok: false,
        message: "Erro interno ao criar o twitte",
        error: error.message || error,
      });      
    }

  })

  app.post("/twitte", async (req, res) => {
    try {
      const data = req.body;
      const twitte = await twitteRepository.create(data);
  
      return res.status(201).send({
        ok: true,
        message: "Twitte criado com sucesso!",
        data: twitte,
      });
  
    } catch (error: any) {
      console.error("Erro ao criar twitte:", error);
      return res.status(500).send({
        ok: false,
        message: "Erro interno ao criar o twitte",
        error: error.message || error,
      });
    }
  });
  
  //LISTAR TODOS OS TWITTES
  app.get("/twitte", async (req, res) => {
    try {
      const twittes = await twitteRepository.list();
      return res.status(200).send({
        ok: true,
        message: "Todos os twittes listados com sucesso",
        data: twittes,
      });
    } catch (error: any) {
      console.error(error);
      return res.status(500).send({
        ok: false,
        message: "Erro ao listar os twittes",
        error: error.message || error,
      });
    }
  });

  //CURTIR TWITTE 
  app.post("/like", async (req, res) => {
    try {
      const { userId, tweetId } = req.body;
  
      if (!userId || !tweetId) {
        return res.status(400).json({ error: "userId e tweetId são obrigatórios" });
      }
  
      const result = await likeRepository.likeTwitte({
        userId, tweetId,
        
      });
  
      return res.status(200).json(result);
  
    } catch (error) {
      console.error("Erro na rota /like:", error);
      return res.status(500).json({ error: "Erro ao dar like" });
    }
  });



app.listen(process.env.PORT || 3000, () => {
    console.log(`🔥 Rodando na porta ${process.env.PORT || 3000}`);
  });
  