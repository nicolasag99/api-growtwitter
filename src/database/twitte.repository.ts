import { handlerError } from "../config/error.config.js"
import { prisma } from "../config/prisma.config.js";
import type { CreateTwitte } from "../dtos/create-twitte.dtos.js"

export class TwitteRepository {

    //FUNCTION CREATE
    public async create(data: CreateTwitte) {
      try {
        const twitte = await prisma.twitte.create({
          data: {
            content: data.content,
            replies: data.replies,
            likes: data.likes,
            comments: data.comments,
            user: {
              connect: { id: data.userId }
            }
          },
          include: {
            user: true
          }
        });
    
        console.log("Novo twitte criado:", twitte);
        return twitte;
    
      } catch (error: any) {
        console.error("Erro ao criar novo Twitte:", error);
        throw error;
      }
    }
    
      

    // FUNCTION GET

    public async list() {
        try {
            const twittes = await prisma.twitte.findMany();
            return twittes;
        } catch (error: any) {
          console.error("Erro ao listtar todos os Twittes:", error);
          throw error;
        }
    }

    
}