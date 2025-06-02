/**
 * Session database operations
 *
 * This module provides all database operations related to user sessions.
 * Sessions are used for refresh token management and device tracking.
 */

import { prisma } from "../lib/prisma";
import type { Session, Prisma } from "@/generated/prisma";

/**
 * Create a new user session
 */
export async function createSession(
	data: Prisma.SessionCreateInput,
): Promise<Session> {
	return await prisma.session.create({
		data,
	});
}

/**
 * Get session by ID
 */
export async function getSessionById(
	sessionId: string,
): Promise<Session | null> {
	return await prisma.session.findUnique({
		where: { id: sessionId },
		include: {
			user: true,
		},
	});
}

/**
 * Get all active sessions for a user
 */
export async function getUserSessions(userId: string): Promise<Session[]> {
	return await prisma.session.findMany({
		where: {
			userId,
			expiresAt: {
				gt: new Date(),
			},
		},
		orderBy: {
			createdAt: "desc",
		},
	});
}

/**
 * Update session last accessed time
 */
export async function updateSessionAccess(sessionId: string): Promise<Session> {
	return await prisma.session.update({
		where: { id: sessionId },
		data: {
			lastActiveAt: new Date(),
		},
	});
}

/**
 * Delete session by ID (logout)
 */
export async function deleteSession(sessionId: string): Promise<Session> {
	return await prisma.session.delete({
		where: { id: sessionId },
	});
}

/**
 * Delete all sessions for a user (logout from all devices)
 */
export async function deleteAllUserSessions(userId: string): Promise<number> {
	const result = await prisma.session.deleteMany({
		where: { userId },
	});
	return result.count;
}

/**
 * Delete expired sessions (cleanup)
 */
export async function deleteExpiredSessions(): Promise<number> {
	const result = await prisma.session.deleteMany({
		where: {
			expiresAt: {
				lt: new Date(),
			},
		},
	});
	return result.count;
}

/**
 * Check if session exists and is valid
 */
export async function isSessionValid(sessionId: string): Promise<boolean> {
	const session = await prisma.session.findUnique({
		where: { id: sessionId },
		select: { expiresAt: true },
	});

	if (!session) {
		return false;
	}

	return session.expiresAt > new Date();
}
