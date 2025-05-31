import { z } from "zod";

// Base project schema
export const ProjectSchema = z.object({
	name: z
		.string()
		.min(1, "Name is required")
		.max(100, "Name must be less than 100 characters"),
	description: z.string().optional(),
	status: z
		.enum(["PLANNING", "IN_PROGRESS", "COMPLETED", "ON_HOLD", "ARCHIVED"])
		.default("PLANNING"),
	githubUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
	demoUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
	tags: z.array(z.string()).default([]),
	isPublic: z.boolean().default(false),
});

// Create project input
export const CreateProjectSchema = ProjectSchema;

// Update project input
export const UpdateProjectSchema = ProjectSchema.partial().extend({
	id: z.string().uuid(),
});

// Query filters
export const ProjectFiltersSchema = z.object({
	userId: z.string().uuid().optional(),
	status: z
		.enum(["PLANNING", "IN_PROGRESS", "COMPLETED", "ON_HOLD", "ARCHIVED"])
		.optional(),
	isPublic: z.boolean().optional(),
	tags: z.array(z.string()).optional(),
	limit: z.number().int().min(1).max(100).default(20),
	offset: z.number().int().min(0).default(0),
});

// Export types
export type CreateProjectInput = z.infer<typeof CreateProjectSchema>;
export type UpdateProjectInput = z.infer<typeof UpdateProjectSchema>;
export type ProjectFilters = z.infer<typeof ProjectFiltersSchema>;
