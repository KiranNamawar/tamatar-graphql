import { z } from "zod";

// Base daily log schema
export const DailyLogSchema = z.object({
	title: z
		.string()
		.min(1, "Title is required")
		.max(200, "Title must be less than 200 characters"),
	content: z.string().min(1, "Content is required"),
	learned: z.string().optional(),
	challenges: z.string().optional(),
	goals: z.string().optional(),
	mood: z.enum(["VERY_LOW", "LOW", "NEUTRAL", "HIGH", "VERY_HIGH"]).optional(),
	tags: z.array(z.string()).default([]),
	isPublic: z.boolean().default(false),
	projectId: z.string().optional(),
});

// Create daily log input
export const CreateDailyLogSchema = DailyLogSchema;

// Update daily log input
export const UpdateDailyLogSchema = DailyLogSchema.partial().extend({
	id: z.string().uuid(),
});

// Query filters
export const DailyLogFiltersSchema = z.object({
	userId: z.string().uuid().optional(),
	projectId: z.string().uuid().optional(),
	isPublic: z.boolean().optional(),
	tags: z.array(z.string()).optional(),
	limit: z.number().int().min(1).max(100).default(20),
	offset: z.number().int().min(0).default(0),
	startDate: z.date().optional(),
	endDate: z.date().optional(),
});

// Export types
export type CreateDailyLogInput = z.infer<typeof CreateDailyLogSchema>;
export type UpdateDailyLogInput = z.infer<typeof UpdateDailyLogSchema>;
export type DailyLogFilters = z.infer<typeof DailyLogFiltersSchema>;
