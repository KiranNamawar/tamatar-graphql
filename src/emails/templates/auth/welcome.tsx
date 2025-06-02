import type React from "react";
import { Text, Link } from "@react-email/components";
import { EmailLayout, Button, Alert } from "../components";

interface WelcomeEmailProps {
	username: string;
	verificationUrl: string;
}

/**
 * Welcome email sent to new users upon registration.
 * Includes email verification link and onboarding guidance.
 */
export const WelcomeEmail: React.FC<WelcomeEmailProps> = ({
	username,
	verificationUrl,
}) => {
	return (
		<EmailLayout
			preview="Welcome to Tamatar! Please verify your email to get started."
			title="Welcome to Tamatar"
		>
			<Text className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
				Welcome to Tamatar, {username}! 🍅
			</Text>{" "}
			<Text className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-6">
				Thank you for joining Tamatar, the developer progress tracking platform.
				We're excited to help you track your coding journey, manage projects,
				and connect with other developers.
			</Text>
			<Alert variant="info" className="mb-6">
				To get started, please verify your email address by clicking the button
				below.
			</Alert>
			<div className="text-center mb-8">
				<Button href={verificationUrl} variant="primary">
					Verify Email Address
				</Button>
			</div>
			<Text className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-4">
				After verifying your email, you'll be able to:
			</Text>
			<div className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-6 pl-0">
				<Text className="mb-2">📝 Log your daily coding progress</Text>
				<Text className="mb-2">🚀 Track and manage your projects</Text>
				<Text className="mb-2">📚 Discover and save learning resources</Text>
				<Text className="mb-2">🤝 Connect with other developers</Text>
				<Text className="mb-2">📊 Analyze your development patterns</Text>
			</div>
			<Text className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-6">
				If you didn't create this account, you can safely ignore this email.
			</Text>
			<Text className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
				This verification link will expire in 24 hours. If you need a new link,{" "}
				<Link
					href="https://tamatar.dev/auth/resend-verification"
					className="text-primary-600 dark:text-primary-400 underline hover:text-primary-700 dark:hover:text-primary-300"
				>
					click here to resend
				</Link>
				.
			</Text>
		</EmailLayout>
	);
};
