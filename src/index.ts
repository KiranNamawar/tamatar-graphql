import { yoga } from "@/graphql/yoga";

const server = Bun.serve({
	port: 4000,
	fetch: yoga,
});

console.info(
	`Server is running on ${new URL(
		yoga.graphqlEndpoint,
		`http://${server.hostname}:${server.port}`,
	)}`,
);
