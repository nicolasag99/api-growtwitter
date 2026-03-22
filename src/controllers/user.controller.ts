import type { Request, Response } from "express";
import { UserRepository } from "../database/user.repository.js";
import { FollowRepository } from "../database/follow.repository.js";

const userRepository = new UserRepository();
const followRepository = new FollowRepository();

export class UserController {

  //GET - LIST ALL USERS
  
  async listAllUser(req: Request, res: Response) {
    try {
      const users = await userRepository.listAllUser();
      return res.status(200).send({
        ok: true,
        message: "Usuários listados com sucesso",
        data: users,
      });
    } catch (error) {
      console.error("Erro ao listar usuários:", error);
      return res.status(500).json({
        ok: false,
        message: "Erro ao listar usuários",
        error,
      });
    }
  }

  // GET - LIST USER

  async listUser(req: Request, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          ok: false,
          message: "O ID do usuário é obrigatório.",
        });
      }

      const user = await userRepository.listUser(id);

      if (!user) {
        return res.status(404).json({
          ok: false,
          message: "Usuário não encontrado.",
        });
      }

      const loggedUserId = (req as any).user?.id;
      let data = user as Record<string, unknown>;
      if (loggedUserId && loggedUserId !== id) {
        const isFollowing = await followRepository.isFollowing(loggedUserId, id);
        data = { ...user, isFollowing };
      }

      return res.status(200).json({
        ok: true,
        message: "Usuário listado com sucesso.",
        data,
      });
    } catch (error) {
      console.error("Erro ao listar usuário:", error);
      return res.status(500).json({
        ok: false,
        message: "Erro interno ao listar usuário.",
      });
    }
  }

  // POST - CREATE USER
  async creteUser(req: Request, res: Response) {
    try {
      const result = await userRepository.create(req.body);

      return res.status(200).send({
        ok: true,
        message: "Usuário criado com sucesso",
        data: result,
      });
    } catch (error: any) {
      res.status(500).json({ message: "Erro ao criar usuário", error });
    }
  }

  //PATCH - UPDATE USER
  async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body;

      if (!id) {
        return res.status(400).json({
          ok: false,
          message: "ID do usuário não informado.",
        });
      }

      const patchUser = await userRepository.update(id, data);

      if (!patchUser) {
        return res.status(404).json({
          ok: false,
          message: "Usuário não encontrado.",
        });
      }

      return res.status(200).json({
        ok: true,
        message: "Usuário atualizado com sucesso!",
        data: patchUser,
      });
    } catch (error: any) {
      console.error("Erro ao atualizar usuário:", error);
      return res.status(500).json({
        ok: false,
        message: "Erro ao atualizar o usuário.",
        error: error.message,
      });
    }
  }
}
