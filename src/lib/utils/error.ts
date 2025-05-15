import { GraphQLError } from "graphql";

export class AppError extends GraphQLError {
	constructor(
		message: string,
		{
			code,
			metadata,
			...extensions
		}: {
			code: ErrorCode;
			metadata?: Record<string, unknown>;
			[key: string]: unknown;
		},
	) {
		super(message, {
			extensions: {
				code,
				metadata,
				...extensions
			},
		});
		this.name = "AppError";
	}
}

export enum ErrorCode {
	ENV_VARIABLE_NOT_SET = "ENV_VARIABLE_NOT_SET",
	INVALID_INPUT = "INVALID_INPUT",
	NOT_FOUND = "NOT_FOUND",
	UNAUTHORIZED = "UNAUTHORIZED",
	INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
	DATABASE_ERROR = "DATABASE_ERROR",
	EMAIL_ERROR = "EMAIL_ERROR",
	UNKNOWN_ERROR = "UNKNOWN_ERROR",
}
