import { prisma } from "../config/prisma.config.js";

export class ReplyLikeRepository {
  public async likeReplyByLoggedUser(loggedUserId: string, replyId: string) {
    try {
      const existingLike = await prisma.replyLike.findFirst({
        where: {
          userId: loggedUserId,
          replyId,
        },
      });

      if (!existingLike) {
        await prisma.replyLike.create({
          data: {
            userId: loggedUserId,
            replyId,
          },
        });

        const reply = await prisma.reply.findUnique({
          where: { id: replyId },
          include: { _count: { select: { ReplyLike: true } } },
        });
        return {
          message: "Like adicionado!",
          added: true,
          likes: reply?._count.ReplyLike ?? 0,
        };
      } else {
        await prisma.replyLike.delete({
          where: { id: existingLike.id },
        });

        const reply = await prisma.reply.findUnique({
          where: { id: replyId },
          include: { _count: { select: { ReplyLike: true } } },
        });
        return {
          message: "Like removido!",
          added: false,
          likes: reply?._count.ReplyLike ?? 0,
        };
      }
    } catch (error) {
      console.error("Erro ao criar ou remover curtida no comentário:", error);
      throw error;
    }
  }
}
