/**
 * Hash a password using Bun's built-in password hashing
 */
export async function hashPassword(password: string): Promise<string> {
	return await Bun.password.hash(password, {
		algorithm: "bcrypt",
		cost: 12, // Higher cost for better security
	});
}

/**
 * Verify a password against a hash
 */
export async function verifyPassword(
	password: string,
	hash: string,
): Promise<boolean> {
	return await Bun.password.verify(password, hash);
}