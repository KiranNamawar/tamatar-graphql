import { createYoga } from "graphql-yoga";
import { schema } from "./schema";
import { useResponseCache } from "@graphql-yoga/plugin-response-cache";
import {
	createInlineSigningKeyProvider,
	useJWT,
} from "@graphql-yoga/plugin-jwt";
import type { GraphQLContext } from "./context";

const yoga = createYoga<GraphQLContext>({
	schema,
	plugins: [
		useJWT({
			signingKeyProviders: [
				createInlineSigningKeyProvider(process.env.JWT_SECRET ?? ""),
			],
		}),
		useResponseCache({
			session: (request) => request.headers.get("authorization"),
		}),
	],
});

export { yoga };
