import builder from "@/lib/graphql/pothos";

builder.mutationField("google", (t) =>
	t.field({
		type: "String",
		args: {
			token: t.arg.string({ required: true }),
		},
		resolve: async (parent, { token }, context) => {
			// TODO: Implement your Google authentication logic here
			return "access_token";
		},
	}),
);
