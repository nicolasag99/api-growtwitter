import { handlerError } from "../config/error.config.js"
import { prisma } from "../config/prisma.config.js";
import type { CreateUser } from "../dtos/create-user.dtos.js";

export class UserRepository {

    
    //FUNCTION CREATE
    public async create(data: CreateUser) {
        try {
            const user = await prisma.user.create({
            data: {
                name: data.name,
                userName: data.userName,
                email: data.email,
                password: data.password,
                bio: data.bio ?? null
            },
            });
            return user;
        } catch (error: any) {
            return handlerError(error);
        }
    }

    // FUNCTION GET
    public async list() {
        try {
            const users = await prisma.user.findMany();
            return users;
        } catch (error: any) {
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
                    bio: data.bio ?? null
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
                    id: userId
                }
            });
            return user;
        } catch (error: any) {
            return handlerError(error);
        }
    }

}