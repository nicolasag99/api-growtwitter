import express  from "express";
import { UserRepository } from "./database/user.repository.js";
import "dotenv/config";
import { handlerError } from "./config/error.config.js";
import { TwitteRepository } from "./database/twitte.repository.js";
import { LikeRepository } from "./database/like.repository.js";
import { FollowRepository } from "./database/follow.repository.js";
import { ReplyRepository } from "./database/reply.repository.js";

const app = express();
app.use(express.json());

const userRepository = new UserRepository();
const twitteRepository = new TwitteRepository();
const likeRepository = new LikeRepository();
const followRepository = new FollowRepository();
const replyRepository = new ReplyRepository();;

  // GET - listar usuários
  app.get("/users", async (req, res) => {
      try {
        const users = await userRepository.listAllUser();
        return res.status(200).send({
          ok: true,
          message: "Usuários listados com sucesso",
          data: users
      })
      } catch (error) {
        res.status(500).json({ message: "Erro ao listar usuários", error });
      }
    });

  // GET - buscar um usuário

  app.get("/user/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!id) {
        return res.status(400).json({
          ok: false,
          message: "O ID do usuário é obrigatório.",
        });
      }
  
      const user = await userRepository.listUser(id);
  
      if (!user) {
        return res.status(404).json({
          ok: false,
          message: "Usuário não encontrado.",
        });
      }
  
      return res.status(200).json({
        ok: true,
        message: "Usuário listado com sucesso.",
        data: user,
      });
    } catch (error) {
      console.error("Erro ao listar usuário:", error);
      return res.status(500).json({
        ok: false,
        message: "Erro interno ao listar usuário.",
      });
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

  //DEIXAR/SEGUIR USUARIO

  app.post("/follow", async (req, res) => {
    const { followerId, followingId } = req.body;

    try {
      const result = await followRepository.toggleFollow({ followerId, followingId });
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: "Erro ao seguir/deixar de seguir o usuário." });
    }
  })


//REPLY

//POST REPLIES
app.post("/reply", async (req, res) => {
  try {
    const { userId, tweetId, content } = req.body;

    if (!userId || !tweetId) {
      return res.status(400).json({ error: "userId e tweetId são obrigatórios" });
    }

    const reply = await replyRepository.createReply({ userId, tweetId, content });
    res.status(201).json(reply);

  } catch (error) {
    console.error("Erro na rota /reply:", error);
    res.status(500).json({ error: "Erro ao criar reply" });
  }
});

//LIST REPLIES
app.get("/replies", async (req, res) => {
  try {
    const replies = await replyRepository.listReplies();
    res.status(200).json(replies);
  } catch (error) {
    console.error("Erro ao listar replies:", error);
    res.status(500).json({ error: "Erro interno" });
  }
});


app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        ok: false,
        message: "Email e senha são obrigatórios",
      });
    }

    const user = await userRepository.login(email, password);

    return res.status(200).send({
      ok: true,
      data: user,
    });
  } catch (error: any) {
    return res.status(401).send({
      ok: false,
      message: error.message || "Falha no login",
    });
  }
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`🔥 Rodando na porta ${process.env.PORT || 3000}`);
  });

