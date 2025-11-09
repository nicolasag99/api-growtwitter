import { checkPrime } from "crypto";
import { prisma } from "../config/prisma.config.js";
import type { CreateLike} from "../dtos/create.like.dtos.js"



export class LikeRepository {

    public async likeTwitte(data: CreateLike) {
        try {
          
          const existingLike = await prisma.like.findFirst({
            where: {
              userId: data.userId,
              tweetId: data.tweetId
            }
          });
      
          if (!existingLike) {
            
            await prisma.like.create({
              data: {
                userId: data.userId,
                tweetId: data.tweetId
              }
            });
      
            
            await prisma.twitte.update({
              where: { id: data.tweetId },
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
              where: { id: data.tweetId },
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
      
}