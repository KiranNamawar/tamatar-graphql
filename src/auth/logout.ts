import builder from "@/lib/graphql/pothos";

builder.mutationField("logout", (t) =>
    t.field({
        type: "Boolean",
        resolve: async (parent, args, context) => {
            // TODO: Implement your logout logic here
            return true;
        },
    }),
);
