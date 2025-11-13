import type { Request, Response } from "express";
import { TwitteRepository } from "../database/twitte.repository.js";
import { LikeRepository } from "../database/like.repository.js";

const twitteRepository = new TwitteRepository();
const likeRepository = new LikeRepository();

// POST - Create Twitte
export class TwitteController {
  async createTwitte(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body;
      const twitte = await twitteRepository.create(data);

      return res.status(200).send({
        ok: true,
        message: "Twitte criado com sucesso",
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
  }

  //GET - LIST ALL TWITTES
  async listAllTwittes(req: Request, res: Response) {
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
  }

  //POST LIKE TWITTE
  async likeTwitte(req: Request, res: Response) {
    try {
      const { userId, tweetId } = req.body;

      if (!userId || !tweetId) {
        return res
          .status(400)
          .json({ error: "userId e tweetId são obrigatórios" });
      }

      const result = await likeRepository.likeTwitte({
        userId,
        tweetId,
      });

      return res.status(200).json(result);
    } catch (error) {
      console.error("Erro na rota /like:", error);
      return res.status(500).json({ error: "Erro ao dar like" });
    }
  }
}
