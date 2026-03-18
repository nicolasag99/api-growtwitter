import { prisma } from "../config/prisma.config.js";
import bcrypt from "bcrypt";

export class AuthRepository {

  public async findByEmail(email: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });
      return user;
    } catch (error) {
      console.error("Erro ao buscar usuário por email:", error);
      throw error;
    }
  }

  public async login(email: string, plainPassword: string) {
    try {
      const user = await this.findByEmail(email);

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
        userName: user.userName,
        message: "Login realizado com sucesso",
      };
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw error instanceof Error ? error : new Error("Falha na autenticação");
    }
  }
}
