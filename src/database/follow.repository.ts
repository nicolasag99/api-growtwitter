import { prisma } from "../config/prisma.config.js"
import type { CreateFollow } from "../dtos/create.follow.js"

export class FollowRepository {

  public async toggleFollowByLoggedUser(loggedUserId: string, followingId: string) {
    try {
      if (loggedUserId === followingId) {
        throw new Error("Você não pode seguir a si mesmo.");
      }

      const existingFollow = await prisma.follows.findFirst({
        where: {
          followerId: loggedUserId,
          followingId,
        },
      });

      if (existingFollow) {
        await prisma.follows.delete({
          where: {
            id: existingFollow.id,
          },
        });

        const userFollowed = await prisma.user.findUnique({
          where: { id: followingId },
          select: { name: true, userName: true },
        });
        const name = userFollowed?.name ?? "Usuário";
        const userName = userFollowed?.userName ?? "desconhecido";
        console.log(`Deixou de seguir:  ${userName}`);
        return {
          message: `Deixou de seguir ${userName}.`,
          isFollowing: false,
        };
      }

      await prisma.follows.create({
        data: {
          followerId: loggedUserId,
          followingId,
        },
      });

      const userFollowed = await prisma.user.findUnique({
        where: { id: followingId },
        select: { name: true, userName: true },
      });
      const name = userFollowed?.name ?? "Usuário";
      const userName = userFollowed?.userName ?? "desconhecido";
      console.log(`Seguindo: ${userName}`);
      return {
        message: `Você está seguindo ${userName}.`,
        isFollowing: true,
      };
    } catch (error) {
      console.error("Erro ao seguir/deixar de seguir:", error);
      throw error;
    }
  }

  public async toggleFollow(data: CreateFollow) {
    return this.toggleFollowByLoggedUser(data.followerId, data.followingId);
  }

  public async isFollowing(loggedUserId: string, followingId: string): Promise<boolean> {
    if (loggedUserId === followingId) return false;
    const existing = await prisma.follows.findFirst({
      where: {
        followerId: loggedUserId,
        followingId,
      },
    });
    return !!existing;
  }
}
