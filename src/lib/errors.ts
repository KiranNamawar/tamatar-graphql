/**
 * Application error types
 */
export class AppError extends Error {
	constructor(
		public message: string,
		public statusCode: number = 500,
		public code?: string,
	) {
		super(message);
		this.name = "AppError";
	}
}

export class ValidationError extends AppError {
	constructor(message: string = "Validation failed") {
		super(message, 400, "VALIDATION_ERROR");
	}
}

export class AuthenticationError extends AppError {
	constructor(message: string = "Authentication required") {
		super(message, 401, "AUTHENTICATION_ERROR");
	}
}

export class AuthorizationError extends AppError {
	constructor(message: string = "Insufficient permissions") {
		super(message, 403, "AUTHORIZATION_ERROR");
	}
}

export class NotFoundError extends AppError {
	constructor(resource: string = "Resource") {
		super(`${resource} not found`, 404, "NOT_FOUND");
	}
}

export class ConflictError extends AppError {
	constructor(message: string) {
		super(message, 409, "CONFLICT");
	}
}

export class RateLimitError extends AppError {
	constructor(message: string = "Too many requests") {
		super(message, 429, "RATE_LIMIT_EXCEEDED");
	}
}

/**
 * Standard API response types
 */
export interface SuccessResponse<T = any> {
	success: true;
	data: T;
	message?: string;
}

export interface ErrorResponse {
	success: false;
	error: string;
	code?: string;
	details?: any;
}

/**
 * Create success response
 */
export function createSuccessResponse<T>(
	data: T,
	message?: string,
): SuccessResponse<T> {
	return {
		success: true,
		data,
		...(message && { message }),
	};
}

/**
 * Create error response
 */
export function createErrorResponse(
	error: string,
	code?: string,
	details?: any,
): ErrorResponse {
	return {
		success: false,
		error,
		...(code && { code }),
		...(details && { details }),
	};
}

/**
 * Handle error and return appropriate response
 */
export function handleError(error: unknown): {
	response: ErrorResponse;
	statusCode: number;
} {
	if (error instanceof AppError) {
		return {
			response: createErrorResponse(error.message, error.code),
			statusCode: error.statusCode,
		};
	}

	// Log unexpected errors
	console.error("Unexpected error:", error);

	return {
		response: createErrorResponse("Internal server error", "INTERNAL_ERROR"),
		statusCode: 500,
	};
}
