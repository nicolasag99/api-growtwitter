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
                tweetId
              }
            });
      
            
            await prisma.twitte.update({
              where: { id: tweetId },
              data: {
                likes: { increment: 1 }
              }
            });
      
            return { message: "Like adicionado!" };
          } else {
            
            await prisma.like.delete({
              where: { id: existingLike.id }
            });
      
            
            await prisma.twitte.update({
              where: { id: tweetId },
              data: {
                likes: { decrement: 1 }
              }
            });
      
            return { message: "Like removido!" };
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