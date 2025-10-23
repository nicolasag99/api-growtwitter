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
      
              // Relaciona com um usuário já existente
              user: {
                connect: { id: data.userId } // <--- conecta pelo id do usuário
              }
            },
            include: {
              user: true // opcional: retorna o usuário junto
            }
          });
          return twitte;
        } catch (error: any) {
          return handlerError(error);
        }
      }
      

    // FUNCTION GET

    public async list() {
        try {
            const twittes = await prisma.twitte.findMany(); // Corrected method to fetch all records
            return twittes;
        } catch (error: any) {
            return handlerError(error);
        }
    }
}