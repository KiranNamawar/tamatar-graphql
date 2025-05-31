import { builder } from "./pothos";

// Import all types to register them with the schema
import "./types/user";
import "./types/project";
import "./types/daily-log";

builder.queryType({
	fields: (t) => ({
		hello: t.field({
			type: "String",
			resolve: () => "Hello from Tamatar GraphQL API!",
		}),
	}),
});

const schema = builder.toSchema();

export { schema };