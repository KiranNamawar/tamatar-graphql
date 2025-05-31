import { z } from "zod";

// Update user profile schema
export const updateUserProfileSchema = z.object({
	name: z
		.string()
		.min(1, "Name is required")
		.max(50, "Name must not exceed 50 characters")
		.optional(),
	bio: z.string().max(500, "Bio must not exceed 500 characters").optional(),
	avatar: z.string().url("Invalid avatar URL").optional(),
});

// User profile response schema
export const userProfileSchema = z.object({
	id: z.string(),
	username: z.string(),
	name: z.string().nullable(),
	avatar: z.string().nullable(),
	bio: z.string().nullable(),
	createdAt: z.date(),
});

// Inferred types
export type UpdateUserProfileInput = z.infer<typeof updateUserProfileSchema>;
export type UserProfile = z.infer<typeof userProfileSchema>;
