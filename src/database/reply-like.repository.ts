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

        const updated = await prisma.reply.update({
          where: { id: replyId },
          data: {
            likes: { increment: 1 },
          },
        });

        return { message: "Like adicionado!", added: true, likes: updated.likes };
      } else {
        await prisma.replyLike.delete({
          where: { id: existingLike.id },
        });

        const updated = await prisma.reply.update({
          where: { id: replyId },
          data: {
            likes: { decrement: 1 },
          },
        });

        return { message: "Like removido!", added: false, likes: updated.likes };
      }
    } catch (error) {
      console.error("Erro ao criar ou remover curtida no comentário:", error);
      throw error;
    }
  }
}
