import { Hr, Link, Section, Text } from "@react-email/components";

/**
 * Email footer component with links, legal information, and unsubscribe.
 * Provides consistent footer across all email templates.
 */
export function EmailFooter() {
	const currentYear = new Date().getFullYear();

	return (
		<Section className="bg-gray-50 px-6 py-6">
			<Hr className="border-gray-200 my-4" />

			{/* Footer links */}
			<div className="text-center mb-4">
				<Link
					href="https://tamatar.dev/dashboard"
					className="text-primary-500 font-semibold no-underline hover:underline mx-2"
				>
					Dashboard
				</Link>
				<Text className="text-gray-400 inline mx-1">•</Text>
				<Link
					href="https://tamatar.dev/settings"
					className="text-primary-500 font-semibold no-underline hover:underline mx-2"
				>
					Settings
				</Link>
				<Text className="text-gray-400 inline mx-1">•</Text>
				<Link
					href="https://tamatar.dev/help"
					className="text-primary-500 font-semibold no-underline hover:underline mx-2"
				>
					Help
				</Link>
			</div>

			{/* Company information */}
			<Text className="text-gray-500 text-sm text-center m-0 mb-2">
				© {currentYear} Tamatar. All rights reserved.
			</Text>

			{/* Address */}
			<Text className="text-gray-400 text-xs text-center m-0 mb-4">
				Tamatar Inc., 123 Developer Street, Code City, CC 12345
			</Text>

			{/* Unsubscribe */}
			<div className="text-center">
				<Link
					href="https://tamatar.dev/unsubscribe"
					className="text-gray-400 text-xs no-underline hover:underline"
				>
					Unsubscribe from these emails
				</Link>
				<Text className="text-gray-400 text-xs inline mx-2">|</Text>
				<Link
					href="https://tamatar.dev/privacy"
					className="text-gray-400 text-xs no-underline hover:underline"
				>
					Privacy Policy
				</Link>
			</div>
		</Section>
	);
}
