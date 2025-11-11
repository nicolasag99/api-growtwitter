import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export function handlerError(error: any) {
    if(error instanceof PrismaClientKnownRequestError) {
        console.log(`Erro [${error.code}]: ${error.message}`)
        return null
    }
}