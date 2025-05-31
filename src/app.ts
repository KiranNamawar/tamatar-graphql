import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { secureHeaders } from "hono/secure-headers";
import { authRoutes } from "./modules/auth";

// Create the Hono app
export const app = new Hono();

// Apply global middleware
app.use("*", logger());
app.use("*", prettyJSON());
app.use("*", secureHeaders());
app.use(
	"*",
	cors({
		origin: ["http://localhost:3000", "https://tamatar.dev"],
		credentials: true,
	}),
);

// Health check endpoint
app.get("/health", (c) => {
	return c.json({
		status: "ok",
		timestamp: new Date().toISOString(),
	});
});

// Root endpoint
app.get("/", (c) => {
	return c.json({
		name: "Tamatar GraphQL API",
		version: "1.0.0",
		documentation: "/docs",
		graphql: "/graphql",
	});
});

// Auth routes
app.route("/auth", authRoutes);

// API documentation
app.get("/docs", (c) => {
	return c.json({
		message: "API documentation will be available here",
	});
});

// 404 for undefined routes
app.notFound((c) => {
	return c.json(
		{
			status: 404,
			message: "Not Found",
		},
		404,
	);
});

// Global error handler
app.onError((err, c) => {
	console.error(`[ERROR] ${err.message}`, err);
	return c.json(
		{
			status: 500,
			message: "Internal Server Error",
			error: process.env.NODE_ENV === "production" ? undefined : err.message,
		},
		500,
	);
});
