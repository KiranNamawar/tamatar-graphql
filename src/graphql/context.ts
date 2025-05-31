import type { YogaInitialContext } from "graphql-yoga";
import type { prisma } from "@/lib/prisma";

export interface GraphQLContext extends YogaInitialContext {
	prisma: typeof prisma;
	user?: {
		id: string;
		email: string;
	};
}
