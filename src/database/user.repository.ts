import { handlerError } from "../config/error.config.js";
import { prisma } from "../config/prisma.config.js";
import type { CreateUser } from "../dtos/create-user.dtos.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;

export class UserRepository {
  //FUNCTION CREATE
  public async create(data: CreateUser) {
    try {
      const hashed = await bcrypt.hash(data.password, SALT_ROUNDS);

      const user = await prisma.user.create({
        data: {
          name: data.name,
          userName: data.userName,
          email: data.email,
          password: hashed,
          bio: data.bio ?? null,
        },
      });
      return user;
    } catch (error: any) {
      return handlerError(error);
    }
  }

  // FUNCTION GET ALL USERS
  public async listAllUser() {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          email: true,
          name: true,
          userName: true,
          bio: true,
          twittes: true,

          _count: {
            select: {
              Follows: true,
              Following: true,
            },
          },
        },
      });

      return users;
    } catch (error: any) {
      console.error("Erro ao listar usuários:", error);
      return handlerError(error);
    }
  }

  // FUNCTIOS GET USER
  public async listUser(userId: string) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          id: true,
          name: true,
          userName: true,
          bio: true,
          _count: {
            select: {
              Follows: true,
              Following: true,
            },
          },
          twittes: {
            select: {
              content: true,
              likes: true,
              replies: true,
            },
          },
        },
      });

      return user;
    } catch (error: any) {
      console.error("Erro ao listar usuário:", error);
      return handlerError(error);
    }
  }

  //FUNCTION UPDATE
  public async update(id: string, data: CreateUser) {
    try {
      const user = await prisma.user.update({
        where: { id: id },
        data: {
          name: data.name,
          userName: data.userName,
          email: data.email,
          password: data.password,
          bio: data.bio ?? null,
        },
      });
      return user;
    } catch (error: any) {
      return handlerError(error);
    }
  }

  //FUNCTION DELETE
  public async delete(userId: string) {
    try {
      const user = await prisma.user.delete({
        where: {
          id: userId,
        },
      });
      return user;
    } catch (error: any) {
      return handlerError(error);
    }
  }

  //FUNCTION LOGIN
  public async login(email: string, plainPassword: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      const isValid = await bcrypt.compare(plainPassword, user.password);

      if (!isValid) {
        throw new Error("Senha incorreta");
      }

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        message: "Login realizado com sucesso",
      };
    } catch (error: any) {
      console.error("Erro ao fazer login:", error);
      throw new Error(error.message);
    }
  }
}
