import type React from "react";
import { Text, Link } from "@react-email/components";
import { EmailLayout, Button, Alert } from "../components";

interface VerifyEmailProps {
	username: string;
	verificationUrl: string;
}

/**
 * Email verification template sent when users need to verify their email address.
 */
export const VerifyEmail: React.FC<VerifyEmailProps> = ({
	username,
	verificationUrl,
}) => {
	return (
		<EmailLayout
			preview="Please verify your email address for Tamatar"
			title="Verify Your Email"
		>
			<Text className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
				Verify Your Email Address
			</Text>

			<Text className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-6">
				Hi {username},
			</Text>

			<Text className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-6">
				To complete your account setup and start using Tamatar, please verify
				your email address by clicking the button below.
			</Text>

			<div className="text-center mb-8">
				<Button href={verificationUrl} variant="primary">
					Verify Email Address
				</Button>
			</div>

			<Alert variant="warning" className="mb-6">
				This verification link will expire in 24 hours for security reasons.
			</Alert>

			<Text className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-6">
				If you're having trouble clicking the button, you can copy and paste
				this link into your browser:
			</Text>

			<Text className="text-gray-600 dark:text-gray-400 text-sm md:text-base break-all mb-6 p-4 bg-gray-100 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700">
				{verificationUrl}
			</Text>

			<Text className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
				If you didn't request this verification, you can safely ignore this
				email. Your account will remain unverified until you click the
				verification link.
			</Text>
		</EmailLayout>
	);
};
