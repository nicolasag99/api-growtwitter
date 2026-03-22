import { prisma } from "../config/prisma.config.js";
import type { CreateTwitte } from "../dtos/create-twitte.dtos.js"

export class TwitteRepository {

    //FUNCTION CREATE - CREATE TWITTE
    public async createByLoggedUser(loggedUserId: string, content: string) {
      return this.create({ content, userId: loggedUserId });
    }

    public async create(data: CreateTwitte & { userId: string }) {
      try {
        const twitte = await prisma.twitte.create({
          data: {
            content: data.content,
            user: {
              connect: { id: data.userId },
            },
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
            replies: true,
            comments: true,
            createdAt: true,
            user: {
              select: {
                id: true,
                name: true,
                userName: true,
              },
            },
            _count: { select: { Like: true } },
          } as any,
          orderBy: { createdAt: "desc" } as any,
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
          select: {
            id: true,
            content: true,
            replies: true,
            comments: true,
            createdAt: true,
            user: {
              select: {
                id: true,
                name: true,
                userName: true,
              },
            },
            _count: { select: { Like: true } },
          } as any,
          orderBy: { createdAt: "desc" } as any,
        });
        return twittes;
      }
      catch (error: any) {
        console.error("Erro ao listar twittes do usuário:", error);
        throw error;
      }
    }
    
}

