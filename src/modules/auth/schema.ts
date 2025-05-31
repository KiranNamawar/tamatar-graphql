import { z } from "zod";

// Registration schema - only email and password required
// Username will be auto-generated from email part before '@'
export const registerSchema = z.object({
	email: z.string().trim().email("Invalid email address"),
	password: z
		.string()
		.trim()
		.min(8, "Password must be at least 8 characters")
		.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
			"Password must contain at least one lowercase letter, one uppercase letter, and one number",
		),
	name: z
		.string()
		.trim()
		.min(1, "Name is required")
		.max(50, "Name must not exceed 50 characters"),
});

// Login schema
export const loginSchema = z.object({
	email: z.string().trim().email("Invalid email address"),
	password: z.string().trim().min(1, "Password is required"),
});

// Password reset request schema
export const forgotPasswordSchema = z.object({
	email: z.string().trim().email("Invalid email address"),
});

// Password reset schema
export const resetPasswordSchema = z.object({
	token: z.string().min(1, "Reset token is required"),
	password: z
		.string()
		.trim()
		.min(8, "Password must be at least 8 characters")
		.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
			"Password must contain at least one lowercase letter, one uppercase letter, and one number",
		),
});

// Refresh token schema (uses session ID)
export const refreshTokenSchema = z.object({
	refreshToken: z.string().min(1, "Refresh token is required"), // This will be the JWT containing sessionId
});

// Email verification schema
export const emailVerificationSchema = z.object({
	token: z.string().min(1, "Verification token is required"),
});

// Auth response types
export const authResponseSchema = z.object({
	accessToken: z.string(),
	refreshToken: z.string(),
});

// Inferred types
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type PasswordResetRequestInput = z.infer<typeof forgotPasswordSchema>;
export type PasswordResetInput = z.infer<typeof resetPasswordSchema>;
export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>;
export type EmailVerificationInput = z.infer<typeof emailVerificationSchema>;
export type AuthResponse = z.infer<typeof authResponseSchema>;
