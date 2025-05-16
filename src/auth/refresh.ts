import builder from "@/lib/graphql/pothos";

builder.mutationField("refresh", (t) =>
    t.field({
        type: "String",
        resolve: async (parent, args, context) => {
            // TODO: Implement your refresh token logic here
            return "access_token";
        },
    })
);
