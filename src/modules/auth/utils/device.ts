/**
 * Device Detection Utilities
 *
 * Utilities for parsing User-Agent strings and extracting device information
 * for security tracking and session management.
 */

import { UAParser } from "ua-parser-js";

/**
 * Device information interface
 */
export interface DeviceInfo {
	browser: string;
	browserVersion?: string;
	os: string;
	osVersion?: string;
	deviceType: string;
	raw: string;
}

/**
 * Parse device information from User-Agent string
 *
 * @param userAgent - The User-Agent string from the request header
 * @returns Formatted device information string for display
 */
export function parseDeviceInfo(userAgent?: string): string {
	if (!userAgent) {
		return "Unknown Device";
	}

	try {
		const parser = new UAParser(userAgent);
		const result = parser.getResult();

		const browser = result.browser.name || "Unknown Browser";
		const browserVersion = result.browser.version
			? ` ${result.browser.version.split(".")[0]}`
			: "";
		const os = result.os.name || "Unknown OS";
		const osVersion = result.os.version ? ` ${result.os.version}` : "";
		const device = result.device.type || "desktop";

		return `${browser}${browserVersion} on ${os}${osVersion} (${device})`;
	} catch (error) {
		// Log the error but don't expose it to prevent information leakage
		console.warn("Failed to parse User-Agent:", error);
		return "Unknown Device";
	}
}

/**
 * Parse detailed device information from User-Agent string
 *
 * @param userAgent - The User-Agent string from the request header
 * @returns Detailed device information object
 */
export function parseDetailedDeviceInfo(userAgent?: string): DeviceInfo {
	const defaultInfo: DeviceInfo = {
		browser: "Unknown Browser",
		os: "Unknown OS",
		deviceType: "desktop",
		raw: userAgent || "",
	};

	if (!userAgent) {
		return defaultInfo;
	}

	try {
		const parser = new UAParser(userAgent);
		const result = parser.getResult();

		return {
			browser: result.browser.name || "Unknown Browser",
			browserVersion: result.browser.version?.split(".")[0],
			os: result.os.name || "Unknown OS",
			osVersion: result.os.version,
			deviceType: result.device.type || "desktop",
			raw: userAgent,
		};
	} catch (error) {
		console.warn("Failed to parse User-Agent:", error);
		return defaultInfo;
	}
}

/**
 * Check if the device is mobile based on User-Agent
 *
 * @param userAgent - The User-Agent string from the request header
 * @returns True if the device is mobile, false otherwise
 */
export function isMobileDevice(userAgent?: string): boolean {
	if (!userAgent) {
		return false;
	}

	try {
		const parser = new UAParser(userAgent);
		const result = parser.getResult();

		return result.device.type === "mobile" || result.device.type === "tablet";
	} catch (error) {
		return false;
	}
}

/**
 * Get browser name from User-Agent string
 *
 * @param userAgent - The User-Agent string from the request header
 * @returns Browser name or "Unknown Browser" if parsing fails
 */
export function getBrowserName(userAgent?: string): string {
	if (!userAgent) {
		return "Unknown Browser";
	}

	try {
		const parser = new UAParser(userAgent);
		const result = parser.getResult();

		return result.browser.name || "Unknown Browser";
	} catch (error) {
		return "Unknown Browser";
	}
}

/**
 * Get operating system name from User-Agent string
 *
 * @param userAgent - The User-Agent string from the request header
 * @returns OS name or "Unknown OS" if parsing fails
 */
export function getOperatingSystem(userAgent?: string): string {
	if (!userAgent) {
		return "Unknown OS";
	}

	try {
		const parser = new UAParser(userAgent);
		const result = parser.getResult();

		return result.os.name || "Unknown OS";
	} catch (error) {
		return "Unknown OS";
	}
}
