import type { Request, Response } from "express";
import { FollowRepository } from "../database/follow.repository.js";

const followRepository = new FollowRepository();

export class FollowController {

  //POST - FOLLOW/UNFOLLOW USER
  async followUser(req: Request, res: Response) {
    const { followerId, followingId } = req.body;

    try {
      const result = await followRepository.toggleFollow({
        followerId,
        followingId,
      });
      return res.status(200).json(result);
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Erro ao seguir/deixar de seguir o usuário." });
    }
  }
}
