import SchemaBuilder from "@pothos/core";
import ZodPlugin from "@pothos/plugin-zod";
import PrismaPlugin from "@pothos/plugin-prisma";
import type PrismaTypes from "@/generated/pothos-types";
import prisma from "../db/prisma";
import { DateTimeResolver } from "graphql-scalars";

const builder = new SchemaBuilder<{
	PrismaTypes: PrismaTypes;
	Scalars: {
		DateTime: {
			Input: Date;
			Output: Date;
		};
	};
}>({
	plugins: [ZodPlugin, PrismaPlugin],
	zod: {
		validationError: (ZodError, args, context, info) => ZodError,
	},
	prisma: {
		client: prisma,
		onUnusedQuery: process.env.NODE_ENV === "production" ? null : "warn",
	},
});

builder.addScalarType("DateTime", DateTimeResolver);

export default builder;
