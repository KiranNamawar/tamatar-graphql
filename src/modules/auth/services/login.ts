/**
 * Login Service
 *
 * Handles user authentication and session creation.
 * Creates JWT tokens and tracks device information for security.
 */

import {
	AuthenticationError,
	ErrorCode,
} from "@/lib/errors";
import { getUserByEmail, createSession } from "@/db";
import { verifyPassword } from "../utils/password";
import { createTokenResponse } from "../utils/jwt";
import { parseDeviceInfo, parseDetailedDeviceInfo } from "../utils/device";

/**
 * Login request data interface
 */
export interface LoginRequest {
	email: string;
	password: string;
	userAgent?: string;
	ipAddress?: string;
}

/**
 * Login response interface
 */
export interface LoginResponse {
	success: true;
	user: {
		id: string;
		email: string;
		username: string;
		name: string | null;
		emailVerified: boolean;
	};
	tokens: {
		accessToken: string;
		refreshToken: string;
	};
	session: {
		id: string;
		deviceInfo: string;
		expiresAt: Date;
	};
}

/**
 * Authenticate user and create session
 */
export async function loginUser(request: LoginRequest): Promise<LoginResponse> {
	const { email, password, userAgent, ipAddress } = request;

	// Get user by email
	const user = await getUserByEmail(email);
	if (!user) {
		throw new AuthenticationError(
			"Invalid email or password",
			ErrorCode.INVALID_CREDENTIALS,
		);
	}

	// Verify password
	const isPasswordValid = await verifyPassword(password, user.password);
	if (!isPasswordValid) {
		throw new AuthenticationError(
			"Invalid email or password",
			ErrorCode.INVALID_CREDENTIALS,
		);
	}

	// Check if email is verified
	if (!user.emailVerified) {
		throw new AuthenticationError(
			"Please verify your email address before logging in",
			ErrorCode.EMAIL_NOT_VERIFIED,
			{ userId: user.id, email: user.email },
		);
	}

	// Parse device information
	const deviceInfo = parseDeviceInfo(userAgent);
	const detailedDeviceInfo = parseDetailedDeviceInfo(userAgent);

	// Create session (expires in 7 days to match refresh token)
	const sessionExpiresAt = new Date();
	sessionExpiresAt.setDate(sessionExpiresAt.getDate() + 7);

	const session = await createSession({
		user: { connect: { id: user.id } },
		deviceName: deviceInfo,
		deviceType: detailedDeviceInfo.deviceType,
		ipAddress: ipAddress || null,
		userAgent: userAgent || null,
		expiresAt: sessionExpiresAt,
		lastActiveAt: new Date(),
	});

	// Generate JWT tokens
	const tokens = await createTokenResponse(
		{
			id: user.id,
			email: user.email,
			username: user.username,
		},
		session.id,
	);

	return {
		success: true,
		user: {
			id: user.id,
			email: user.email,
			username: user.username,
			name: user.name,
			emailVerified: user.emailVerified,
		},
		tokens,
		session: {
			id: session.id,
			deviceInfo: parseDeviceInfo(userAgent),
			expiresAt: session.expiresAt,
		},
	};
}
