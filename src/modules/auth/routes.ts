import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { loginSchema } from "./schema";
import { loginUser } from "./services/login";
import { AppError } from "@/lib/errors";
import type { ContentfulStatusCode } from "hono/utils/http-status";

export const authRoutes = new Hono()
	.post("/login", zValidator("json", loginSchema), async (c) => {
		try {
			const { email, password } = c.req.valid("json");

			// Get request metadata for security tracking
			const userAgent = c.req.header("user-agent") || "";
			const ipAddress =
				c.req.header("x-forwarded-for") ||
				c.req.header("x-real-ip") ||
				"unknown"; // Call login service
			const result = await loginUser({
				email,
				password,
				userAgent,
				ipAddress,
			});

			return c.json(result);
		} catch (error) {
			console.error("Login error:", error);

			if (error instanceof AppError) {
				return c.json(
					{
						success: false,
						error: error.message,
						code: error.code,
					},
					error.statusCode as ContentfulStatusCode
				);
			}

			// Generic server error
			return c.json(
				{
					success: false,
					error: "An unexpected error occurred",
				},
				500,
			);
		}
	})
	.post("/register", (c) => {
		// TODO: Implement register route
		return c.json({ message: "Register endpoint" });
	})
	.post("/forgot-password", (c) => {
		// TODO: Implement forgot password route
		return c.json({ message: "Forgot password endpoint" });
	})
	.post("/reset-password", (c) => {
		// TODO: Implement reset password route
		return c.json({ message: "Reset password endpoint" });
	})
	.post("/logout", (c) => {
		// TODO: Implement logout route
		return c.json({ message: "Logout endpoint" });
	})
	.post("/refresh-token", (c) => {
		// TODO: Implement refresh token route
		return c.json({ message: "Refresh token endpoint" });
	})
	.post("/verify-email", (c) => {
		// TODO: Implement verify email route
		return c.json({ message: "Email verification endpoint" });
	});
