import {
	createUser,
	getUserByEmail,
	getUserById,
} from "@/db/users";
import { 
	createSession, 
	getSessionById, 
	deactivateSession,
	deactivateAllUserSessions 
} from "@/db/sessions";
import { hashPassword, verifyPassword } from "@/utils/password";
import {
	signAccessToken,
	signRefreshToken,
	verifyRefreshToken,
	createTokenResponse,
	type RefreshTokenPayload,
} from "@/auth/jwt";
import { generateUsernameFromEmail } from "@/utils/user";
import { AuthenticationError, ValidationError } from "@/lib/errors";
import type { RegisterInput, LoginInput } from "@/schemas/auth";

export interface AuthResult {
	user: {
		id: string;
		email: string;
		username: string;
		name: string | null;
	};
	accessToken: string;
	refreshToken: string;
}

export interface RefreshResult {
	accessToken: string;
	refreshToken: string;
}

/**
 * Register a new user
 */
export async function signup(
	input: RegisterInput,
	userAgent?: string,
	ipAddress?: string,
): Promise<AuthResult> {
	const { email, password, name } = input;
	// Check if user already exists
	const existingUser = await getUserByEmail(email);
	if (existingUser) {
		throw new ValidationError("User with this email already exists");
	}

	// Hash password
	const hashedPassword = await hashPassword(password);

	// Generate username from email
	const username = generateUsernameFromEmail(email);

	// Create user
	const userData = {
		email,
		username,
		password: hashedPassword,
		name: name || null,
	};

	const user = await createUser(userData);

	// Create session
	const session = await createSession({
		userId: user.id,
		userAgent,
		ipAddress,
	});

	return createTokenResponse(
		user,
		session.id,
	);
}

/**
 * Login an existing user
 */
export async function login(
	input: LoginInput,
	userAgent?: string,
	ipAddress?: string,
): Promise<AuthResult> {
	const { email, password } = input;
	// Find user by email
	const user = await getUserByEmail(email);
	if (!user) {
		throw new AuthenticationError("Invalid email or password");
	}

	// Verify password
	const isValidPassword = await verifyPassword(password, user.password);
	if (!isValidPassword) {
		throw new AuthenticationError("Invalid email or password");
	}

	// Create new session
	const session = await createSession({
		userId: user.id,
		userAgent,
		ipAddress,
	});

	return await createTokenResponse(
		user,
		session.id,
	);
}

/**
 * Refresh access token using refresh token
 */
export async function refreshTokens(
	refreshToken: string,
	userAgent?: string,
	ipAddress?: string,
): Promise<RefreshResult> {
	try {
		// Verify refresh token
		const payload: RefreshTokenPayload = await verifyRefreshToken(refreshToken);
		// Find session
		const session = await getSessionById(payload.sessionId);
		if (!session || !session.isActive) {
			throw new AuthenticationError("Invalid refresh token");
		}
		// Find user
		const user = await getUserById(session.userId);
		if (!user) {
			throw new AuthenticationError("User not found");
		}

		// Revoke old session
		await deactivateSession(session.id);

		// Create new session
		const newSession = await createSession({
			userId: user.id,
			userAgent,
			ipAddress,
		});

		return createTokenResponse(user, newSession.id);
	} catch (error) {
		throw new AuthenticationError("Invalid or expired refresh token");
	}
}

/**
 * Logout user by revoking session
 */
export async function logout(refreshToken: string): Promise<void> {
	try {
		// Verify refresh token to get session ID
		const payload: RefreshTokenPayload = await verifyRefreshToken(refreshToken);

		// Revoke session
		await deactivateSession(payload.sessionId);
	} catch (error) {
		// If token is invalid, we can still consider logout successful
		// as the user is effectively logged out
	}
}

/**
 * Logout from all devices by revoking all user sessions
 */
export async function logoutFromAllDevices(userId: string): Promise<void> {
	await deactivateAllUserSessions(userId);
}
