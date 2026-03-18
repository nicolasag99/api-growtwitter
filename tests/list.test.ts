import { Request, Response } from "express";
import { UserController } from "../src/controllers/user.controller";

describe("Deve retornar uma lista de usuários", () => {

  test("Deve retornar uma lista de usuarios", async () => {

    // 1. Arrange
    const sut = new UserController();

    const req = {} as Request;

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    } as unknown as Response;

    // 2. Act
    await sut.listAllUser(req, res);

    // 3. Assert
    expect(res.status).toHaveBeenCalledWith(200);
  });

});