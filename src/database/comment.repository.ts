import { prisma } from "../config/prisma.config.js";
import type { CreateComment } from "../dtos/create-comment.dtos.js";

export class CommentRepository {
  public async createCommentByLoggedUser(
    loggedUserId: string,
    tweetId: string,
    content: string
  ) {
    return this.createComment({ userId: loggedUserId, tweetId, content });
  }

  public async createComment(data: CreateComment) {
    try {
      const tweetExists = await prisma.twitte.findUnique({
        where: { id: data.tweetId },
      });

      if (!tweetExists) {
        return { error: "Tweet não encontrado" };
      }

      const comment = await (prisma as any).comment.create({
        data: {
          userId: data.userId,
          tweetId: data.tweetId,
          content: data.content,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              userName: true,
            },
          },
          tweet: {
            select: {
              id: true,
              content: true,
              userId: true,
            },
          },
        },
      });

      return comment;
    } catch (error: unknown) {
      console.error("Erro ao criar comentário:", error);
      throw error;
    }
  }

  public async listComments() {
    try {
      const comments = await (prisma as any).comment.findMany({
        include: {
          user: {
            select: {
              id: true,
              name: true,
              userName: true,
            },
          },
          tweet: {
            select: {
              id: true,
              content: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });
      return comments;
    } catch (error) {
      console.error("Erro ao listar comentários:", error);
      throw error;
    }
  }

  public async listCommentsByTweet(tweetId: string) {
    try {
      const comments = await (prisma as any).comment.findMany({
        where: { tweetId },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              userName: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
      });
      return comments;
    } catch (error) {
      console.error("Erro ao listar comentários do tweet:", error);
      throw error;
    }
  }
}
