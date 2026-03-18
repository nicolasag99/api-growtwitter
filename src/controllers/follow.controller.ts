import type { Request, Response } from "express";
import { FollowRepository } from "../database/follow.repository.js";

const followRepository = new FollowRepository();

export class FollowController {

  //POST - FOLLOW/UNFOLLOW USER (usuário logado = follower)
  async followUser(req: Request, res: Response) {
    const { followingId } = req.body;
    const loggedUserId = (req as any).user?.id;

    if (!loggedUserId) {
      return res.status(401).json({
        error: "Usuário não autenticado. Faça login para seguir usuários.",
      });
    }

    if (!followingId) {
      return res.status(400).json({
        error: "ID do usuário a ser seguido (followingId) é obrigatório.",
      });
    }

    try {
      const result = await followRepository.toggleFollowByLoggedUser(
        loggedUserId,
        followingId
      );
      return res.status(200).json(result);
    } catch (error: any) {
      if (error.message?.includes("seguir a si mesmo")) {
        return res.status(400).json({ error: error.message });
      }
      return res
        .status(500)
        .json({ error: "Erro ao seguir/deixar de seguir o usuário." });
    }
  }
}
