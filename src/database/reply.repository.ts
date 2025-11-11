import { prisma } from "../config/prisma.config.js";
import type { CreateReply } from "../dtos/create.reply.js";
import { handlerError } from "../config/error.config.js";


export class ReplyRepository {
  public async createReply(data: CreateReply) {
    try {
      // Verifica se o tweet existe
      const tweetExists = await prisma.twitte.findUnique({
        where: { id: data.tweetId },
      });

      if (!tweetExists) {
        return { error: "Tweet original não encontrado" };
      }

      // Cria o compartilhamento (reply)
      const reply = await prisma.reply.create({
        data: {
          userId: data.userId,
          tweetId: data.tweetId,
          content: data.content ?? null,
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

      return reply;
    } catch (error: any) {
      console.error("Erro ao criar reply:", error);
      return handlerError(error);
    }
  }

  //LISTAR REPLIES
  public async listReplies() {
    try {
      const replies = await prisma.reply.findMany({
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
      });

      return replies;
    } catch (error) {
      console.error("Erro ao listar replies:", error);
      throw error;
    }
  }
}
