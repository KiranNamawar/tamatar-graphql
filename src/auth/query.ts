import builder from "@/lib/graphql/pothos";

builder.queryField("me", (t) =>
    t.field({
        type: "String",
        resolve: async (parent, args, context) => {
            return "Hey there";
        },
    })
);