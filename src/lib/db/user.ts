import type { Prisma } from "@/generated/prisma";
import prisma from "./prisma";
import { AppError } from "../utils/error";
import { DatabaseError } from "./error";

export async function createUser(params: Prisma.UserCreateInput) {
	try {
		const user = await prisma.user.create({
			data: params,
		});
		return user;
	} catch (error) {
        throw new DatabaseError(error);   
    }
}
