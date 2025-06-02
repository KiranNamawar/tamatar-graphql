import type React from "react";
import { Text, Link } from "@react-email/components";
import { EmailLayout, Alert, Card } from "../components";

interface LoginNotificationProps {
	username: string;
	loginTime: string;
	ipAddress?: string;
	location?: string;
	device?: string;
	browser?: string;
	isNewDevice?: boolean;
}

/**
 * Login notification email sent when users log in from a new device or location.
 */
export const LoginNotification: React.FC<LoginNotificationProps> = ({
	username,
	loginTime,
	ipAddress,
	location,
	device,
	browser,
	isNewDevice = false,
}) => {
	return (
		<EmailLayout
			preview={isNewDevice ? "New device login detected" : "Login notification"}
			title="Login Notification"
		>
			<Text className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
				{isNewDevice ? "New Device Login Detected" : "Login Notification"}
			</Text>{" "}
			<Text className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-6">
				Hi {username},
			</Text>
			<Text className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-6">
				{isNewDevice
					? "We detected a login to your Tamatar account from a new device."
					: "You recently logged into your Tamatar account."}
			</Text>
			{isNewDevice && (
				<Alert variant="warning" className="mb-6">
					If this wasn't you, please secure your account immediately by changing
					your password.
				</Alert>
			)}{" "}
			<Card className="mb-6">
				<Text className="text-gray-900 dark:text-gray-100 text-sm font-medium mb-4">
					Login Details:
				</Text>

				<div className="space-y-2">
					<div className="flex justify-between">
						<Text className="text-gray-700 dark:text-gray-400 text-sm">
							Time:
						</Text>
						<Text className="text-gray-900 dark:text-gray-200 text-sm">
							{loginTime}
						</Text>
					</div>

					{ipAddress && (
						<div className="flex justify-between">
							<Text className="text-gray-700 dark:text-gray-400 text-sm">
								IP Address:
							</Text>
							<Text className="text-gray-900 dark:text-gray-200 text-sm">
								{ipAddress}
							</Text>
						</div>
					)}

					{location && (
						<div className="flex justify-between">
							<Text className="text-gray-700 dark:text-gray-400 text-sm">
								Location:
							</Text>
							<Text className="text-gray-900 dark:text-gray-200 text-sm">
								{location}
							</Text>
						</div>
					)}

					{device && (
						<div className="flex justify-between">
							<Text className="text-gray-700 dark:text-gray-400 text-sm">
								Device:
							</Text>
							<Text className="text-gray-900 dark:text-gray-200 text-sm">
								{device}
							</Text>
						</div>
					)}

					{browser && (
						<div className="flex justify-between">
							<Text className="text-gray-700 dark:text-gray-400 text-sm">
								Browser:
							</Text>
							<Text className="text-gray-900 dark:text-gray-200 text-sm">
								{browser}
							</Text>
						</div>
					)}
				</div>
			</Card>{" "}
			<Text className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-6">
				If this was you, no action is needed. You can manage your active
				sessions and security settings in your{" "}
				<Link
					href="https://tamatar.dev/settings/security"
					className="text-primary-600 dark:text-primary-400 underline hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
				>
					account settings
				</Link>
				.
			</Text>{" "}
			{isNewDevice && (
				<div className="text-center mb-6">
					<Link
						href="https://tamatar.dev/auth/change-password"
						className="inline-block bg-red-600 dark:bg-red-700 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-red-700 dark:hover:bg-red-800 transition-colors"
					>
						Secure My Account
					</Link>
				</div>
			)}
			<Text className="text-gray-600 dark:text-gray-400 text-sm">
				For security questions, contact us at{" "}
				<Link
					href="mailto:security@tamatar.dev"
					className="text-primary-600 dark:text-primary-400 underline hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
				>
					security@tamatar.dev
				</Link>
				.
			</Text>
		</EmailLayout>
	);
};
