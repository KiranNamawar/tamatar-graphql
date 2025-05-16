import type { Prisma } from "@/generated/prisma";
import prisma from "./prisma";
import { DatabaseError } from "./error";

export async function createSession(props: Prisma.SessionCreateInput) {
	try {
		return await prisma.session.create({
			data: props,
		});
	} catch (error) {
		throw new DatabaseError(error);
	}
}
