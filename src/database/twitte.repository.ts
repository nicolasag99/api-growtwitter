import { prisma } from "../config/prisma.config.js";
import type { CreateTwitte } from "../dtos/create-twitte.dtos.js"

export class TwitteRepository {

    //FUNCTION CREATE - CREATE TWITTE

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
         

    // FUNCTION GET - LIST ALL TWITTES

    public async list() {
      try {
        const twittes = await prisma.twitte.findMany({
          select: {
            id: true,
            content: true,
            user: {
              select: {
                id: true,
                name: true,
                userName: true,
              },
            },
          }
        });
    
        return twittes;
      } catch (error: any) {
        console.error("Erro ao listar todos os Twittes:", error);
        throw error;
      }
    }

    // FUNCTION GET - LIST TWITTE BY USER

    public async listByUser(userId: string) {
      try {
        const twittes = await prisma.twitte.findMany({
          where: { userId },
        });
        return twittes;
      }
      catch (error: any) {
        console.error("Erro ao listar twittes do usuário:", error);
        throw error;
      }
    }
    
}

