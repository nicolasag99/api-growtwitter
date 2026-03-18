import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

type JwtPayload = {
  id: string;
};

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token não informado." });
  }

  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ error: "Formato de token inválido." });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return res
      .status(500)
      .json({ error: "JWT_SECRET não configurado no servidor." });
  }

  try {
    const payload = jwt.verify(token, secret) as JwtPayload;
    (req as any).user = { id: payload.id };
    return next();
  } catch {
    return res.status(401).json({ error: "Token inválido ou expirado." });
  }
}

