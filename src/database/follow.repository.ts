import { prisma } from "../config/prisma.config.js"
import type { CreateFollow } from "../dtos/create.follow.js"

export class FollowRepository {
  public async toggleFollow(data: CreateFollow) {
    try {
      const existingFollow = await prisma.follows.findFirst({
        where: {
          followerId: data.followerId,
          followingId: data.followingId,
        },
      });

      if (existingFollow) {
        await prisma.follows.delete({
          where: {
            id: existingFollow.id,
          },
        });

        return { message: "Deixou de seguir o usuário.", isFollowing: false };
      } else {
        await prisma.follows.create({
          data: {
            followerId: data.followerId,
            followingId: data.followingId,
          },
        });

        return { message: "Você está seguindo o usuário.", isFollowing: true };
      }
    } catch (error) {
      console.error("Erro ao seguir/deixar de seguir:", error);
      throw error;
    }
  }
}
