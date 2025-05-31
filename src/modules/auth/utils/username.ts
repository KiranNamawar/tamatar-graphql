/**
 * Utility functions for user-related operations
 */

/**
 * Generate username from email address
 * Takes the part before @ and ensures it's unique
 */
export function generateUsernameFromEmail(email: string): string {
	// Extract part before @
	const emailUsername = email.split("@")[0];

	// Ensure we have a valid email username
	if (!emailUsername) {
		throw new Error("Invalid email format");
	}

	// Clean the username - replace dots and special chars with underscores
	// Allow letters, numbers, underscores, periods, and hyphens
	const cleanUsername = emailUsername
		.toLowerCase()
		.replace(/[^a-z0-9._-]/g, "_")
		.replace(/_{2,}/g, "_") // Replace multiple underscores with single
		.replace(/^_+|_+$/g, ""); // Remove leading/trailing underscores

	// Ensure it's at least 3 characters
	if (cleanUsername.length < 3) {
		return cleanUsername.padEnd(3, "0");
	}

	// Ensure it's not more than 20 characters
	if (cleanUsername.length > 20) {
		return cleanUsername.substring(0, 20);
	}

	return cleanUsername;
}

/**
 * Generate unique username from email with fallback if username exists
 */
export function generateUniqueUsernameFromEmail(
	email: string,
	existingUsernames: string[] = [],
): string {
	const baseUsername = generateUsernameFromEmail(email);

	// If username doesn't exist, return it
	if (!existingUsernames.includes(baseUsername)) {
		return baseUsername;
	}

	// If it exists, append numbers until we find a unique one
	let counter = 1;
	let uniqueUsername = `${baseUsername}${counter}`;

	while (existingUsernames.includes(uniqueUsername)) {
		counter++;
		uniqueUsername = `${baseUsername}${counter}`;

		// Prevent infinite loop - if we get to 999, just use timestamp
		if (counter > 999) {
			uniqueUsername = `${baseUsername}_${Date.now().toString().slice(-6)}`;
			break;
		}
	}

	return uniqueUsername;
}
