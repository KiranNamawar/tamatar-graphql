import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import ValidationPlugin from "@pothos/plugin-validation";
import ZodPlugin from "@pothos/plugin-zod";
import { DateResolver } from "graphql-scalars";
import type PrismaTypes from "@/generated/pothos-types";
import { prisma } from "@/lib/prisma";
import type { GraphQLContext } from "./context";

const builder = new SchemaBuilder<{
	PrismaTypes: PrismaTypes;
	Context: GraphQLContext;
	Scalars: {
		DateTime: {
			Input: Date;
			Output: Date;
		};
	};
}>({
	plugins: [PrismaPlugin, ValidationPlugin, ZodPlugin],
	prisma: {
		client: prisma,
	},
});

// Add DateTime scalar
builder.scalarType("DateTime", {
	...DateResolver,
	description: DateResolver.description ?? undefined,
});

export { builder };
