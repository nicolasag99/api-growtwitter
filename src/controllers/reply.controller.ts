import type { Request, Response } from "express";
import { ReplyRepository } from "../database/reply.repository.js";
import { ReplyLikeRepository } from "../database/reply-like.repository.js";

const replyRepository = new ReplyRepository();
const replyLikeRepository = new ReplyLikeRepository();

export class ReplyController {
    
  //POST - CREATE REPLIES
  async createReplay(req: Request, res: Response) {
    try {
      const { tweetId, content } = req.body;
      const loggedUserId = (req as any).user?.id;

      if (!loggedUserId) {
        return res.status(401).json({ error: "Usuário não autenticado." });
      }

      if (!tweetId) {
        return res.status(400).json({ error: "tweetId é obrigatório" });
      }

      const reply = await replyRepository.createReplyByLoggedUser(
        loggedUserId,
        tweetId,
        content
      );
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

  //POST - LIKE REPLY
  async likeReply(req: Request, res: Response) {
    try {
      const { replyId } = req.body;
      const loggedUserId = (req as any).user?.id;

      if (!loggedUserId) {
        return res.status(401).json({ error: "Usuário não autenticado." });
      }

      if (!replyId) {
        return res.status(400).json({ error: "replyId é obrigatório" });
      }

      const result = await replyLikeRepository.likeReplyByLoggedUser(
        loggedUserId,
        replyId
      );

      return res.status(200).json(result);
    } catch (error) {
      console.error("Erro na rota /reply/like:", error);
      return res.status(500).json({ error: "Erro ao dar like no comentário" });
    }
  }
}
