import builder from "@/lib/graphql/pothos";
import { z } from "zod";

builder.mutationField("login", (t) =>
	t.field({
		type: "String",
		args: {
			email: t.arg.string({ required: true }),
			password: t.arg.string({ required: true }),
		},
		validate: {
			schema: z.object({
				email: z.string().trim().email("Invalid email format"),
				password: z
					.string()
					.trim()
					.min(8, "Password must be at least 8 characters long"),
			}),
		},
		resolve: async (parent, { email, password }, context) => {
			// TODO: Implement your login logic here
			return "access_token";
		},
	}),
);
