import builder from "@/lib/graphql/pothos";
import { z } from "zod";

builder.mutationField("signup", (t) =>
	t.field({
		type: "Boolean",
		args: {
			name: t.arg.string({ required: true }),
			email: t.arg.string({ required: true }),
			password: t.arg.string({ required: true }),
			confirmPassword: t.arg.string({ required: true }),
		},
		validate: {
			schema: z
				.object({
					name: z
						.string()
						.trim()
						.min(1, "Name is required")
						.max(50, "Name is too long"),
					email: z.string().trim().email("Invalid email format"),
					password: z
						.string()
						.trim()
						.regex(
							/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
							"Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number",
						),
					confirmPassword: z.string().trim(),
				})
				.refine((data) => data.password === data.confirmPassword, {
					message: "Passwords do not match",
					path: ["confirmPassword"],
				}),
		},
		resolve: async (
			parent,
			{ name, email, password },
			context,
		) => {
			// TODO: Implement your signup logic here
			return true;
		},
	}),
);
