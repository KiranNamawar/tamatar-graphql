import { z } from "zod";

// Registration schema - only email and password required
// Username will be auto-generated from email part before '@'
export const registerSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z
		.string()
		.min(8, "Password must be at least 8 characters")
		.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
			"Password must contain at least one lowercase letter, one uppercase letter, and one number",
		),
	name: z
		.string()
		.min(1, "Name is required")
		.max(50, "Name must not exceed 50 characters")
		.optional(),
});

// Login schema
export const loginSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(1, "Password is required"),
});

// Password reset request schema
export const passwordResetRequestSchema = z.object({
	email: z.string().email("Invalid email address"),
});

// Password reset schema
export const passwordResetSchema = z.object({
	token: z.string().min(1, "Reset token is required"),
	password: z
		.string()
		.min(8, "Password must be at least 8 characters")
		.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
			"Password must contain at least one lowercase letter, one uppercase letter, and one number",
		),
});

// Change password schema
export const changePasswordSchema = z.object({
	currentPassword: z.string().min(1, "Current password is required"),
	newPassword: z
		.string()
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

// Username update schema (for GraphQL)
export const updateUsernameSchema = z.object({
	username: z
		.string()
		.min(3, "Username must be at least 3 characters")
		.max(20, "Username must not exceed 20 characters")
		.regex(
			/^[a-zA-Z0-9_.-]+$/,
			"Username can only contain letters, numbers, underscores, periods, and hyphens",
		),
});

// Auth response types
export const authResponseSchema = z.object({
	user: z.object({
		id: z.string(),
		email: z.string(),
		username: z.string(),
		name: z.string().nullable(),
		avatar: z.string().nullable(),
		emailVerified: z.boolean(),
	}),
	accessToken: z.string(),
	refreshToken: z.string(),
});

// Inferred types
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type PasswordResetRequestInput = z.infer<
	typeof passwordResetRequestSchema
>;
export type PasswordResetInput = z.infer<typeof passwordResetSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>;
export type EmailVerificationInput = z.infer<typeof emailVerificationSchema>;
export type UpdateUsernameInput = z.infer<typeof updateUsernameSchema>;
export type AuthResponse = z.infer<typeof authResponseSchema>;
