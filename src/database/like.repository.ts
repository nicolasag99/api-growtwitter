import { prisma } from "../config/prisma.config.js";
import type { CreateLike} from "../dtos/create.like.dtos.js";



export class LikeRepository {

    public async likeTwitteByLoggedUser(loggedUserId: string, tweetId: string) {
        try {
          
          const existingLike = await prisma.like.findFirst({
            where: {
              userId: loggedUserId,
              tweetId
            }
          });
      
          if (!existingLike) {
            await prisma.like.create({
              data: {
                userId: loggedUserId,
                tweetId,
              },
            });

            const tweet = await prisma.twitte.findUnique({
              where: { id: tweetId },
              include: { _count: { select: { Like: true } } },
            });
            return {
              message: "Like adicionado!",
              added: true,
              likes: tweet?._count.Like ?? 0,
            };
          } else {
            await prisma.like.delete({
              where: { id: existingLike.id },
            });

            const tweet = await prisma.twitte.findUnique({
              where: { id: tweetId },
              include: { _count: { select: { Like: true } } },
            });
            return {
              message: "Like removido!",
              added: false,
              likes: tweet?._count.Like ?? 0,
            };
          }
      
        } catch (error) {
          console.error("Erro ao criar ou remover curtida:", error);
          throw error;
        }
      }

    public async likeTwitte(data: CreateLike) {
      return this.likeTwitteByLoggedUser(data.userId, data.tweetId);
    }
      
}