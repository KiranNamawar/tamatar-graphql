import { yoga } from "@/graphql/yoga";
import { app } from "@/app";

// Port configuration
const PORT = process.env.PORT ? Number.parseInt(process.env.PORT, 10) : 4000;

// Combined fetch handler that routes GraphQL requests to Yoga and everything else to Hono
const fetchHandler = async (request: Request): Promise<Response> => {
	const url = new URL(request.url);

	// If the request is for GraphQL endpoint, use Yoga
	if (url.pathname === yoga.graphqlEndpoint) {
		return yoga.fetch(request);
	}

	// For all other routes, use Hono
	return app.fetch(request);
};

// Start the server
const server = Bun.serve({
	port: PORT,
	fetch: fetchHandler,
});

// Log server information
console.info(
	`✨ Server is running on http://${server.hostname}:${server.port}`,
);
console.info(
	`🧘 GraphQL endpoint: http://${server.hostname}:${server.port}${yoga.graphqlEndpoint}`,
);
console.info(
	`🚀 REST API available at http://${server.hostname}:${server.port}/`,
);
console.info(`📝 Environment: ${process.env.NODE_ENV || "development"}`);
