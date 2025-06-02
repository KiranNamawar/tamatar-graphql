/**
 * User database operations
 *
 * This module provides all database operations related to users.
 * Functions are kept pure and focused on data access only.
 */

import { prisma } from "../lib/prisma";
import type { User, Prisma } from "@/generated/prisma";

/**
 * Get user by ID
 */
export async function getUserById(userId: string): Promise<User | null> {
	return await prisma.user.findUnique({
		where: { id: userId },
	});
}

/**
 * Get user by email address
 */
export async function getUserByEmail(email: string): Promise<User | null> {
	return await prisma.user.findUnique({
		where: { email: email.toLowerCase() },
	});
}

/**
 * Get user by username
 */
export async function getUserByUsername(
	username: string,
): Promise<User | null> {
	return await prisma.user.findUnique({
		where: { username: username.toLowerCase() },
	});
}

/**
 * Create a new user
 */
export async function createUser(data: Prisma.UserCreateInput): Promise<User> {
	return await prisma.user.create({
		data: {
			...data,
			email: data.email.toLowerCase(),
			username: data.username.toLowerCase(),
		},
	});
}

/**
 * Update user by ID
 */
export async function updateUser(
	userId: string,
	data: Prisma.UserUpdateInput,
): Promise<User> {
	return await prisma.user.update({
		where: { id: userId },
		data,
	});
}

/**
 * Update user email verification status
 */
export async function markEmailAsVerified(userId: string): Promise<User> {
	return await prisma.user.update({
		where: { id: userId },
		data: { emailVerified: true },
	});
}

/**
 * Update user password
 */
export async function updateUserPassword(
	userId: string,
	hashedPassword: string,
): Promise<User> {
	return await prisma.user.update({
		where: { id: userId },
		data: { password: hashedPassword },
	});
}

/**
 * Delete user by ID
 */
export async function deleteUser(userId: string): Promise<User> {
	return await prisma.user.delete({
		where: { id: userId },
	});
}

/**
 * Check if email exists
 */
export async function emailExists(email: string): Promise<boolean> {
	const user = await prisma.user.findUnique({
		where: { email: email.toLowerCase() },
		select: { id: true },
	});
	return user !== null;
}

/**
 * Check if username exists
 */
export async function usernameExists(username: string): Promise<boolean> {
	const user = await prisma.user.findUnique({
		where: { username: username.toLowerCase() },
		select: { id: true },
	});
	return user !== null;
}
