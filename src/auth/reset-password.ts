import builder from "@/lib/graphql/pothos";
import { PASSWORD_SCHEMA } from "@/lib/types/constants";
import { password } from "bun";
import { z } from "zod";

builder.mutationField("resetPassword", (t) =>
	t.field({
		type: "Boolean",
		args: {
			password: t.arg.string({ required: true }),
			confirmPassword: t.arg.string({ required: true }),
		},
		validate: {
			schema: z
				.object({
					password: PASSWORD_SCHEMA,
					confirmPassword: z.string().trim(),
				})
				.refine((data) => data.password === data.confirmPassword, {
					message: "Passwords do not match",
					path: ["confirmPassword"],
				}),
		},
		resolve: async (parent, { password }, context) => {
			// TODO: Implement your reset password logic here
			return true;
		},
	}),
);
