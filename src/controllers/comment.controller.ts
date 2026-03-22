import type { Request, Response } from "express";
import { CommentRepository } from "../database/comment.repository.js";

const commentRepository = new CommentRepository();

export class CommentController {
  async createComment(req: Request, res: Response) {
    try {
      const { tweetId, content } = req.body;
      const loggedUserId = (req as any).user?.id;

      if (!loggedUserId) {
        return res.status(401).json({ error: "Usuário não autenticado." });
      }

      if (!tweetId || !content) {
        return res.status(400).json({
          error: "tweetId e content são obrigatórios",
        });
      }

      const comment = await commentRepository.createCommentByLoggedUser(
        loggedUserId,
        tweetId,
        content
      );

      if (comment && "error" in comment) {
        return res.status(404).json({ error: comment.error });
      }

      return res.status(201).json(comment);
    } catch (error) {
      console.error("Erro na rota /comment:", error);
      return res.status(500).json({ error: "Erro ao criar comentário" });
    }
  }

  async listComments(req: Request, res: Response) {
    try {
      const comments = await commentRepository.listComments();
      return res.status(200).json(comments);
    } catch (error) {
      console.error("Erro ao listar comentários:", error);
      return res.status(500).json({ error: "Erro interno" });
    }
  }

  async listCommentsByTweet(req: Request, res: Response) {
    try {
      const { tweetId } = req.params;
      if (!tweetId) {
        return res.status(400).json({ error: "tweetId é obrigatório" });
      }
      const comments = await commentRepository.listCommentsByTweet(tweetId);
      return res.status(200).json(comments);
    } catch (error) {
      console.error("Erro ao listar comentários do tweet:", error);
      return res.status(500).json({ error: "Erro interno" });
    }
  }
}
