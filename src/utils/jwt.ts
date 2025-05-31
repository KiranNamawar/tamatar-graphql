import { SignJWT, jwtVerify } from "jose";

// JWT payload interfaces
export interface AccessTokenPayload {
	userId: string;
	email: string;
	username: string;
	iat?: number;
	exp?: number;
}

export interface RefreshTokenPayload {
	userId: string;
	sessionId: string; // Session ID acts as the refresh token identifier
	iat?: number;
	exp?: number;
}

// Secret key for JWT signing/verification
const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);

/**
 * Sign an access token (short-lived)
 */
export async function signAccessToken(
	payload: Omit<AccessTokenPayload, "iat" | "exp">,
): Promise<string> {
	return await new SignJWT(payload)
		.setProtectedHeader({ alg: "HS256", typ: "access" })
		.setIssuedAt()
		.setExpirationTime("15m") // Access tokens expire in 15 minutes
		.sign(secretKey);
}

/**
 * Sign a refresh token (long-lived)
 */
export async function signRefreshToken(
	payload: Omit<RefreshTokenPayload, "iat" | "exp">,
): Promise<string> {
	return await new SignJWT(payload)
		.setProtectedHeader({ alg: "HS256", typ: "refresh" })
		.setIssuedAt()
		.setExpirationTime("7d") // Refresh tokens expire in 7 days
		.sign(secretKey);
}

/**
 * Verify and decode an access token
 */
export async function verifyAccessToken(
	token: string,
): Promise<AccessTokenPayload> {
	try {
		const { payload, protectedHeader } = await jwtVerify(token, secretKey);

		// Verify this is an access token
		if (protectedHeader.typ !== "access") {
			throw new Error("Invalid token type");
		}

		return payload as unknown as AccessTokenPayload;
	} catch (error) {
		throw new Error("Invalid or expired access token");
	}
}

/**
 * Verify and decode a refresh token
 */
export async function verifyRefreshToken(
	token: string,
): Promise<RefreshTokenPayload> {
	try {
		const { payload, protectedHeader } = await jwtVerify(token, secretKey);

		// Verify this is a refresh token
		if (protectedHeader.typ !== "refresh") {
			throw new Error("Invalid token type");
		}

		return payload as unknown as RefreshTokenPayload;
	} catch (error) {
		throw new Error("Invalid or expired refresh token");
	}
}

/**
 * Extract bearer token from authorization header
 */
export function extractBearerToken(authHeader: string): string | null {
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return null;
	}
	return authHeader.substring(7);
}

/**
 * Create token response for authentication
 */
export async function createTokenResponse(
	user: {
		id: string;
		email: string;
		username: string;
	},
	sessionId: string,
) {
	const accessToken = await signAccessToken({
		userId: user.id,
		email: user.email,
		username: user.username,
	});

	const refreshToken = await signRefreshToken({
		userId: user.id,
		sessionId: sessionId,
	});

	return {
		accessToken,
		refreshToken,
	};
}
