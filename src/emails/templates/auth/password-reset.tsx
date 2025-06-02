import type React from "react";
import { Text, Link } from "@react-email/components";
import { EmailLayout, Button, Alert } from "../components";

interface PasswordResetProps {
	username: string;
	resetUrl: string;
	ipAddress?: string;
	userAgent?: string;
}

/**
 * Password reset email template sent when users request a password reset.
 */
export const PasswordReset: React.FC<PasswordResetProps> = ({
	username,
	resetUrl,
	ipAddress,
	userAgent,
}) => {
	return (
		<EmailLayout
			preview="Reset your Tamatar password"
			title="Password Reset Request"
		>
			<Text className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
				Reset Your Password
			</Text>

			<Text className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-6">
				Hi {username},
			</Text>

			<Text className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-6">
				We received a request to reset your password for your Tamatar account.
				Click the button below to create a new password.
			</Text>

			<div className="text-center mb-8">
				<Button href={resetUrl} variant="primary">
					Reset Password
				</Button>
			</div>

			<Alert variant="warning" className="mb-6">
				This password reset link will expire in 1 hour for security reasons.
			</Alert>

			{(ipAddress || userAgent) && (
				<div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
					<Text className="text-gray-800 dark:text-gray-200 text-sm md:text-base font-medium mb-2">
						Request Details:
					</Text>
					{ipAddress && (
						<Text className="text-gray-700 dark:text-gray-300 text-sm md:text-base mb-1">
							IP Address: {ipAddress}
						</Text>
					)}
					{userAgent && (
						<Text className="text-gray-700 dark:text-gray-300 text-sm md:text-base">
							Device: {userAgent}
						</Text>
					)}
				</div>
			)}

			<Text className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-6">
				If you're having trouble clicking the button, you can copy and paste
				this link into your browser:
			</Text>

			<Text className="text-gray-600 dark:text-gray-400 text-sm md:text-base break-all mb-6 p-4 bg-gray-100 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
				{resetUrl}
			</Text>

			<Alert variant="error" className="mb-6">
				If you didn't request this password reset, please ignore this email and
				consider changing your password immediately if you suspect unauthorized
				access.
			</Alert>

			<Text className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
				For security questions, contact us at{" "}
				<Link
					href="mailto:security@tamatar.dev"
					className="text-primary-600 dark:text-primary-400 underline hover:text-primary-700 dark:hover:text-primary-300"
				>
					security@tamatar.dev
				</Link>
				.
			</Text>
		</EmailLayout>
	);
};
