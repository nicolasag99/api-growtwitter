import { prisma } from "../config/prisma.config.js";

export class ReplyLikeRepository {
  public async likeReplyByLoggedUser(loggedUserId: string, replyId: string) {
    try {
      const existingLike = await (prisma as any).replyLike.findFirst({
        where: {
          userId: loggedUserId,
          replyId,
        },
      });

      if (!existingLike) {
        await (prisma as any).replyLike.create({
          data: {
            userId: loggedUserId,
            replyId,
          },
        });

        const reply = await prisma.reply.findUnique({
          where: { id: replyId },
          include: { _count: { select: { ReplyLike: true } } } as any,
        });
        return {
          message: "Like adicionado!",
          added: true,
          likes: (reply as any)?._count?.ReplyLike ?? 0,
        };
      } else {
        await (prisma as any).replyLike.delete({
          where: { id: existingLike.id },
        });

        const reply = await prisma.reply.findUnique({
          where: { id: replyId },
          include: { _count: { select: { ReplyLike: true } } } as any,
        });
        return {
          message: "Like removido!",
          added: false,
          likes: (reply as any)?._count?.ReplyLike ?? 0,
        };
      }
    } catch (error) {
      console.error("Erro ao criar ou remover curtida no comentário:", error);
      throw error;
    }
  }
}
