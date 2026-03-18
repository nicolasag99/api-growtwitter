import type { Request, Response } from "express";
import { AuthRepository } from "../database/auth.repository.js";
import jwt from "jsonwebtoken";

const authRepository = new AuthRepository();

export class AuthController {

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).send({
          ok: false,
          message: "Email e senha são obrigatórios",
        });
      }

      const user = await authRepository.login(email, password);

      const secret = process.env.JWT_SECRET;
      if (!secret) {
        return res.status(500).send({
          ok: false,
          message: "JWT_SECRET não configurado no servidor",
        });
      }

      const expiresIn =
        Number(process.env.JWT_EXPIRES_IN_SECONDS) || 60 * 60 * 24; // 1 dia
      const token = jwt.sign({ id: user.id }, secret, { expiresIn });

      return res.status(200).send({
        ok: true,
        data: {
          user,
          token,
        },
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Falha no login";
      return res.status(401).send({
        ok: false,
        message,
      });
    }
  }

  async logout(req: Request, res: Response) {
    return res.status(200).send({
      ok: true,
      message: "Logout realizado com sucesso",
    });
  }
}
