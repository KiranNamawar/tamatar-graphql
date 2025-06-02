import React from "react";
import {
	Html,
	Head,
	Preview,
	Container,
	Text,
	Link,
	Hr,
	Img,
} from "@react-email/components";
import { EmailLayout, Card, Button, Alert } from "../components";

export interface FeatureAnnouncementEmailProps {
	recipientName: string;
	featureName: string;
	featureDescription: string;
	featureImage?: string;
	features: Array<{
		title: string;
		description: string;
		icon?: string;
	}>;
	ctaText: string;
	ctaUrl: string;
	releaseDate: string;
	releaseNotes?: {
		url: string;
		version: string;
	};
	feedback?: {
		url: string;
		email: string;
	};
}

export function FeatureAnnouncementEmail({
	recipientName,
	featureName,
	featureDescription,
	featureImage,
	features,
	ctaText,
	ctaUrl,
	releaseDate,
	releaseNotes,
	feedback,
}: FeatureAnnouncementEmailProps) {
	const previewText = `New Feature: ${featureName} - ${featureDescription.slice(0, 100)}...`;

	return (
		<Html>
			<Head />
			<EmailLayout preview={previewText} title={`Introducing ${featureName}`}>
				<Container className="max-w-2xl mx-auto bg-white dark:bg-gray-900">
					{/* Hero Section */}
					<div className="text-center p-8 md:p-10 bg-gradient-to-br from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700 rounded-xl mb-8">
						<Text className="text-base md:text-lg font-semibold text-white mb-2 opacity-90">
							🚀 New Feature Alert!
						</Text>
						<Text className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
							{featureName}
						</Text>
						<Text className="text-base md:text-lg text-white mb-6 leading-relaxed opacity-95">
							{featureDescription}
						</Text>

						{featureImage && (
							<div className="mt-6">
								<Img
									src={featureImage}
									alt={`${featureName} preview`}
									className="w-full max-w-lg h-auto rounded-lg border-2 border-white/20"
								/>
							</div>
						)}
					</div>

					{/* What's New Section */}
					<Card>
						<Text className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-5">
							✨ What's New
						</Text>
						<div className="mt-4">
							{features.map((feature) => (
								<div
									key={feature.title}
									className="mb-6 pb-5 border-b border-gray-200 dark:border-gray-700 last:border-b-0 last:pb-0 last:mb-0"
								>
									<div className="flex items-center mb-2">
										{feature.icon && (
											<span className="text-xl mr-3">{feature.icon}</span>
										)}
										<Text className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100">
											{feature.title}
										</Text>
									</div>
									<Text className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
										{feature.description}
									</Text>
								</div>
							))}
						</div>
					</Card>

					{/* CTA Section */}
					<div className="text-center p-6 md:p-8 bg-gray-50 dark:bg-gray-800 rounded-xl my-8">
						<Text className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-5">
							Ready to try {featureName}?
						</Text>
						<Button href={ctaUrl} variant="primary">
							{ctaText}
						</Button>
					</div>

					{/* Release Information */}
					<Card>
						<Text className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-5">
							📅 Release Information
						</Text>
						<div className="mt-4">
							<div className="flex items-center mb-3">
								<Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mr-3 min-w-[100px]">
									Release Date:
								</Text>
								<Text className="text-sm text-gray-600 dark:text-gray-400">
									{releaseDate}
								</Text>
							</div>

							{releaseNotes && (
								<div className="flex items-center mb-3">
									<Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mr-3 min-w-[100px]">
										Version:
									</Text>
									<Text className="text-sm text-gray-600 dark:text-gray-400">
										{releaseNotes.version} -{" "}
										<Link
											href={releaseNotes.url}
											className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors no-underline ml-2"
										>
											View Release Notes
										</Link>
									</Text>
								</div>
							)}
						</div>
					</Card>

					{/* Feedback Section */}
					{feedback && (
						<Alert variant="info">
							<Text className="text-sm leading-relaxed">
								We'd love to hear your thoughts on {featureName}!{" "}
								<Link
									href={feedback.url}
									className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors no-underline font-semibold ml-1"
								>
									Share your feedback
								</Link>{" "}
								or reply to {feedback.email}
							</Text>
						</Alert>
					)}

					{/* Help Section */}
					<div className="text-center p-4 md:p-6 bg-gray-50 dark:bg-gray-800 rounded-lg my-6">
						<Text className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
							Need help getting started? Check out our{" "}
							<Link
								href="#"
								className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors no-underline"
							>
								documentation
							</Link>{" "}
							or{" "}
							<Link
								href="#"
								className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors no-underline"
							>
								contact support
							</Link>
							.
						</Text>
					</div>

					<Hr className="border-0 border-t border-gray-200 dark:border-gray-700 my-8" />

					<Text className="text-sm text-gray-600 dark:text-gray-400 text-center italic">
						Thank you for being part of the Tamatar community, {recipientName}!
					</Text>
				</Container>
			</EmailLayout>
		</Html>
	);
}
