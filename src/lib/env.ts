import { z } from "zod";

/**
 * Environment variable validation schema for Tamatar GraphQL backend
 * 
 * This file validates all environment variables required for the application
 * to run properly. It provides type-safe access to configuration values
 * and ensures required variables are present with a// Log successful environment validation
if (isDevelopment) {
  console.log('✅ Environment variables validated successfully');
  console.log(`🚀 Starting Tamatar GraphQL server on port ${env.PORT}`);
  console.log(`🗄️  Database: ${env.DATABASE_URL.split('@')[1] || 'Connected'}`);
  console.log('📧 Email: Pluck API configured');
  console.log(`🔐 GitHub OAuth: ${env.GITHUB_CLIENT_ID ? 'Configured' : 'Not configured'}`);
  console.log(`🎯 Environment: ${env.NODE_ENV}`);
}e defaults
 * for development.
 * 
 * @see TECHNICAL_SPECS.md for complete environment variable documentation
 * @see ARCHITECTURE.md Rule 12: Environment Configuration
 */

// Environment validation schema
const envSchema = z.object({
	// Application Environment
	NODE_ENV: z
		.enum(["development", "staging", "production"])
		.default("development")
		.describe("Application environment mode"),

	PORT: z
		.string()
		.regex(/^\d+$/, "PORT must be a valid number")
		.transform(Number)
		.default("4000")
		.describe("Server port number"),

	// CORS Configuration
	CORS_ORIGIN: z
		.string()
		.url("CORS_ORIGIN must be a valid URL")
		.default("http://localhost:4000")
		.describe("Allowed CORS origin for frontend application"),

	// Database Configuration
	DATABASE_URL: z
		.string()
		.url("DATABASE_URL must be a valid PostgreSQL connection string")
		.startsWith(
			"postgresql://",
			"DATABASE_URL must be a PostgreSQL connection string",
		)
		.describe("PostgreSQL database connection string"),

	// JWT Authentication
	JWT_SECRET: z
		.string()
		.min(32, "JWT_SECRET must be at least 32 characters for security")
		.describe("Secret key for JWT token signing and verification"),

	JWT_EXPIRES_IN: z
		.string()
		.regex(
			/^\d+[smhd]$/,
			"JWT_EXPIRES_IN must be a valid time string (e.g., 15m, 24h, 7d)",
		)
		.default("15m")
		.describe("JWT access token expiration time"),

	JWT_REFRESH_EXPIRES_IN: z
		.string()
		.regex(/^\d+[smhd]$/, "JWT_REFRESH_EXPIRES_IN must be a valid time string")
		.default("7d")
		.describe("JWT refresh token expiration time"), // Email Service Configuration (Pluck)
	PLUCK_SECRET_KEY: z
		.string()
		.min(1, "PLUCK_SECRET_KEY is required for email functionality")
		.describe("Pluck email service secret key"),

	EMAIL_FROM_ADDRESS: z
		.string()
		.email("EMAIL_FROM_ADDRESS must be a valid email address")
		.describe("Default sender email address"),

	EMAIL_FROM_NAME: z
		.string()
		.min(1, "EMAIL_FROM_NAME is required")
		.default("Tamatar")
		.describe("Default sender name for emails"),

	// GitHub OAuth Configuration
	GITHUB_CLIENT_ID: z
		.string()
		.min(1, "GITHUB_CLIENT_ID is required for GitHub integration")
		.describe("GitHub OAuth application client ID"),

	GITHUB_CLIENT_SECRET: z
		.string()
		.min(1, "GITHUB_CLIENT_SECRET is required for GitHub integration")
		.describe("GitHub OAuth application client secret"),

	GITHUB_REDIRECT_URI: z
		.string()
		.url("GITHUB_REDIRECT_URI must be a valid URL")
		.default("http://localhost:3000/auth/github/callback")
		.describe("GitHub OAuth redirect URI"),

	// Redis Configuration (Optional for caching)
	REDIS_URL: z
		.string()
		.url("REDIS_URL must be a valid Redis connection string")
		.optional()
		.describe("Redis connection string for caching (optional)"),

	// File Upload Configuration
	MAX_FILE_SIZE: z
		.string()
		.regex(/^\d+$/, "MAX_FILE_SIZE must be a valid number in bytes")
		.transform(Number)
		.default("5242880") // 5MB default
		.describe("Maximum file upload size in bytes"),

	UPLOAD_DIR: z
		.string()
		.min(1, "UPLOAD_DIR must be specified")
		.default("./uploads")
		.describe("Directory for file uploads"),

	// Logging Configuration
	LOG_LEVEL: z
		.enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"])
		.default("info")
		.describe("Application logging level"),

	// Rate Limiting
	RATE_LIMIT_WINDOW_MS: z
		.string()
		.regex(/^\d+$/, "RATE_LIMIT_WINDOW_MS must be a valid number")
		.transform(Number)
		.default("900000") // 15 minutes
		.describe("Rate limiting window in milliseconds"),

	RATE_LIMIT_MAX_REQUESTS: z
		.string()
		.regex(/^\d+$/, "RATE_LIMIT_MAX_REQUESTS must be a valid number")
		.transform(Number)
		.default("100")
		.describe("Maximum requests per rate limit window"),

	// Security Configuration
	BCRYPT_ROUNDS: z
		.string()
		.regex(/^\d+$/, "BCRYPT_ROUNDS must be a valid number")
		.transform(Number)
		.default("12")
		.describe("Number of bcrypt hashing rounds"),

	// Session Configuration
	SESSION_CLEANUP_INTERVAL_MS: z
		.string()
		.regex(/^\d+$/, "SESSION_CLEANUP_INTERVAL_MS must be a valid number")
		.transform(Number)
		.default("3600000") // 1 hour
		.describe("Interval for cleaning up expired sessions in milliseconds"),

	// Development/Testing Configuration
	SKIP_EMAIL_VERIFICATION: z
		.string()
		.transform((val) => val === "true")
		.default("false")
		.describe("Skip email verification in development (boolean)"),

	ENABLE_PLAYGROUND: z
		.string()
		.transform((val) => val === "true")
		.default("true")
		.describe("Enable GraphQL playground in development (boolean)"),

	// Analytics Configuration (Optional)
	ANALYTICS_ENABLED: z
		.string()
		.transform((val) => val === "true")
		.default("false")
		.describe("Enable analytics tracking (boolean)"),
});

/**
 * Validate and parse environment variables
 *
 * This function validates all environment variables against the schema
 * and returns type-safe configuration object. It will throw an error
 * if required variables are missing or invalid.
 */
function validateEnv() {
	try {
		const env = envSchema.parse(process.env);

		// Additional validation for production environment
		if (env.NODE_ENV === "production") {
			// Ensure strong JWT secret in production
			if (env.JWT_SECRET.length < 64) {
				throw new Error(
					"JWT_SECRET must be at least 64 characters in production",
				);
			}

			// Ensure HTTPS origins in production
			if (!env.CORS_ORIGIN.startsWith("https://")) {
				console.warn("Warning: CORS_ORIGIN should use HTTPS in production");
			}

			// Disable playground in production
			if (env.ENABLE_PLAYGROUND) {
				console.warn(
					"Warning: GraphQL playground should be disabled in production",
				);
			}
		}

		return env;
	} catch (error) {
		if (error instanceof z.ZodError) {
			const errorMessages = error.errors.map(
				(err) => `${err.path.join(".")}: ${err.message}`,
			);
			console.error("❌ Environment validation failed:");
			for (const message of errorMessages) {
				console.error(`  - ${message}`);
			}
			console.error(
				"\n📋 Please check your .env file and ensure all required variables are set.",
			);
			console.error(
				"📖 See TECHNICAL_SPECS.md for complete environment variable documentation.\n",
			);

			process.exit(1);
		}

		throw error;
	}
}

// Validate and export environment configuration
export const env = validateEnv();

// Export the type for use throughout the application
export type Environment = z.infer<typeof envSchema>;

// Export helper functions for environment checks
export const isDevelopment = env.NODE_ENV === "development";
export const isProduction = env.NODE_ENV === "production";
export const isStaging = env.NODE_ENV === "staging";

/**
 * Database configuration object
 *
 * Provides easy access to database-related configuration
 */
export const dbConfig = {
	url: env.DATABASE_URL,
} as const;

/**
 * JWT configuration object
 *
 * Provides easy access to JWT-related configuration
 */
export const jwtConfig = {
	secret: env.JWT_SECRET,
	expiresIn: env.JWT_EXPIRES_IN,
	refreshExpiresIn: env.JWT_REFRESH_EXPIRES_IN,
} as const;

/**
 * Email configuration object
 *
 * Provides easy access to email service configuration using Pluck
 */
export const emailConfig = {
	pluckApiKey: env.PLUCK_SECRET_KEY,
	from: {
		email: env.EMAIL_FROM_ADDRESS,
		name: env.EMAIL_FROM_NAME,
	},
	skipVerification: env.SKIP_EMAIL_VERIFICATION,
} as const;

/**
 * GitHub OAuth configuration object
 *
 * Provides easy access to GitHub integration configuration
 */
export const githubConfig = {
	clientId: env.GITHUB_CLIENT_ID,
	clientSecret: env.GITHUB_CLIENT_SECRET,
	redirectUri: env.GITHUB_REDIRECT_URI,
} as const;

/**
 * Security configuration object
 *
 * Provides easy access to security-related configuration
 */
export const securityConfig = {
	bcryptRounds: env.BCRYPT_ROUNDS,
	rateLimit: {
		windowMs: env.RATE_LIMIT_WINDOW_MS,
		maxRequests: env.RATE_LIMIT_MAX_REQUESTS,
	},
	sessionCleanupInterval: env.SESSION_CLEANUP_INTERVAL_MS,
} as const;

/**
 * Server configuration object
 *
 * Provides easy access to server-related configuration
 */
export const serverConfig = {
	port: env.PORT,
	corsOrigin: env.CORS_ORIGIN,
	logLevel: env.LOG_LEVEL,
	enablePlayground: env.ENABLE_PLAYGROUND,
} as const;

/**
 * File upload configuration object
 *
 * Provides easy access to file upload configuration
 */
export const uploadConfig = {
	maxFileSize: env.MAX_FILE_SIZE,
	uploadDir: env.UPLOAD_DIR,
} as const;

// Log successful environment validation
if (isDevelopment) {
	console.log("✅ Environment variables validated successfully");
	console.log(`🚀 Starting Tamatar GraphQL server on port ${env.PORT}`);
	console.log(`🗄️  Database: ${env.DATABASE_URL.split("@")[1] || "Connected"}`);
	console.log("📧 Email: Pluck API configured");
	console.log(
		`🔐 GitHub OAuth: ${env.GITHUB_CLIENT_ID ? "Configured" : "Not configured"}`,
	);
	console.log(`🎯 Environment: ${env.NODE_ENV}`);
}
