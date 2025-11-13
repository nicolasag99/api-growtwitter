import type { Request, Response } from "express";
import { ReplyRepository } from "../database/reply.repository.js";

const replyRepository = new ReplyRepository();

export class ReplyController {
    
  //POST - CREATE REPLIES
  async createReplay(req: Request, res: Response) {
    try {
      const { userId, tweetId, content } = req.body;

      if (!userId || !tweetId) {
        return res
          .status(400)
          .json({ error: "userId e tweetId são obrigatórios" });
      }

      const reply = await replyRepository.createReply({
        userId,
        tweetId,
        content,
      });
      res.status(201).json(reply);
    } catch (error) {
      console.error("Erro na rota /reply:", error);
      res.status(500).json({ error: "Erro ao criar reply" });
    }
  }

  //GET - LIST REPLIES
  async listReplies(req: Request, res: Response) {
    try {
      const replies = await replyRepository.listReplies();
      res.status(200).json(replies);
    } catch (error) {
      console.error("Erro ao listar replies:", error);
      res.status(500).json({ error: "Erro interno" });
    }
  }
}
