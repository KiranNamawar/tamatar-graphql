import type React from "react";
import {
	Html,
	Head,
	Preview,
	Container,
	Text,
	Link,
	Hr,
} from "@react-email/components";
import { EmailLayout, Card, Button, Alert } from "../components";

export interface SecurityAlertEmailProps {
	recipientName: string;
	alertType:
		| "breach"
		| "suspicious_activity"
		| "policy_change"
		| "vulnerability"
		| "update_required";
	severity: "low" | "medium" | "high" | "critical";
	title: string;
	description: string;
	detectedAt: string;
	affectedData?: {
		types: string[];
		userCount?: number;
		isPersonalData: boolean;
	};
	suspiciousActivity?: {
		activityType: string;
		location: string;
		ipAddress: string;
		device: string;
		timestamp: string;
	};
	immediateActions: Array<{
		title: string;
		description: string;
		urgent: boolean;
		actionUrl?: string;
		actionText?: string;
	}>;
	preventiveMeasures: string[];
	timeline?: Array<{
		time: string;
		event: string;
		status: "completed" | "in_progress" | "planned";
	}>;
	contact: {
		securityTeam: string;
		reportUrl?: string;
		emergencyContact?: string;
	};
	resources?: Array<{
		title: string;
		url: string;
		description: string;
	}>;
}

export function SecurityAlertEmail({
	recipientName,
	alertType,
	severity,
	title,
	description,
	detectedAt,
	affectedData,
	suspiciousActivity,
	immediateActions,
	preventiveMeasures,
	timeline,
	contact,
	resources,
}: SecurityAlertEmailProps) {
	const getSeverityColor = () => {
		switch (severity) {
			case "low":
				return "bg-green-500 dark:bg-green-600";
			case "medium":
				return "bg-yellow-500 dark:bg-yellow-600";
			case "high":
				return "bg-orange-500 dark:bg-orange-600";
			case "critical":
				return "bg-red-500 dark:bg-red-600";
			default:
				return "bg-gray-500 dark:bg-gray-600";
		}
	};

	const getSeverityIcon = () => {
		switch (severity) {
			case "low":
				return "🟢";
			case "medium":
				return "🟡";
			case "high":
				return "🟠";
			case "critical":
				return "🔴";
			default:
				return "⚠️";
		}
	};

	const getAlertIcon = () => {
		switch (alertType) {
			case "breach":
				return "🚨";
			case "suspicious_activity":
				return "👀";
			case "policy_change":
				return "📋";
			case "vulnerability":
				return "🛡️";
			case "update_required":
				return "🔄";
			default:
				return "⚠️";
		}
	};

	const previewText = `Security Alert: ${title} - ${severity.toUpperCase()} severity`;
	return (
		<Html>
			<Head />
			<Preview>{previewText}</Preview>
			<EmailLayout preview={previewText}>
				<Container className="max-w-2xl mx-auto bg-white dark:bg-gray-900">
					{/* Critical Alert Header */}
					<Alert
						variant={
							severity === "critical"
								? "error"
								: severity === "high"
									? "warning"
									: "info"
						}
					>
						<div className="flex items-center justify-center gap-3">
							<span className="text-2xl">{getAlertIcon()}</span>
							<Text className="text-lg md:text-xl font-bold text-center m-0 dark:text-gray-100">
								SECURITY ALERT - {severity.toUpperCase()}
							</Text>
							<span className="text-xl">{getSeverityIcon()}</span>
						</div>
					</Alert>

					{/* Main Alert Information */}
					<div
						className={`text-center p-8 rounded-xl my-6 ${getSeverityColor()}`}
					>
						<Text className="text-2xl md:text-3xl font-bold text-white m-0 mb-4 leading-tight">
							{title}
						</Text>
						<Text className="text-base md:text-lg text-white m-0 mb-3 leading-relaxed opacity-95">
							{description}
						</Text>
						<Text className="text-sm text-white m-0 opacity-80 font-medium">
							Detected: {detectedAt}
						</Text>
					</div>

					{/* Affected Data Information */}
					{affectedData && (
						<Card>
							<Text className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 m-0 mb-4">
								📊 Affected Data
							</Text>
							<div className="mt-4">
								<div className="flex justify-between items-start py-3 border-b border-gray-200 dark:border-gray-700">
									<Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 m-0 min-w-[120px]">
										Data Types:
									</Text>
									<Text className="text-sm text-gray-600 dark:text-gray-400 m-0 text-right flex-1">
										{affectedData.types.join(", ")}
									</Text>
								</div>

								{affectedData.userCount && (
									<div className="flex justify-between items-start py-3 border-b border-gray-200 dark:border-gray-700">
										<Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 m-0 min-w-[120px]">
											Users Affected:
										</Text>
										<Text className="text-sm text-gray-600 dark:text-gray-400 m-0 text-right flex-1">
											{affectedData.userCount.toLocaleString()}
										</Text>
									</div>
								)}

								<div className="flex justify-between items-start py-3 border-b border-gray-200 dark:border-gray-700">
									<Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 m-0 min-w-[120px]">
										Personal Data:
									</Text>
									<Text
										className={`text-sm m-0 text-right flex-1 font-semibold ${
											affectedData.isPersonalData
												? "text-red-500 dark:text-red-400"
												: "text-green-600 dark:text-green-400"
										}`}
									>
										{affectedData.isPersonalData
											? "Yes - Personal data affected"
											: "No - No personal data affected"}
									</Text>
								</div>
							</div>
						</Card>
					)}

					{/* Suspicious Activity Details */}
					{suspiciousActivity && (
						<Card>
							<Text className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 m-0 mb-4">
								🔍 Suspicious Activity Details
							</Text>
							<div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
								<div className="flex justify-between mb-2">
									<Text className="text-sm font-semibold text-yellow-800 dark:text-yellow-200 m-0 min-w-[100px]">
										Activity Type:
									</Text>
									<Text className="text-sm text-yellow-800 dark:text-yellow-200 m-0 font-mono">
										{suspiciousActivity.activityType}
									</Text>
								</div>

								<div className="flex justify-between mb-2">
									<Text className="text-sm font-semibold text-yellow-800 dark:text-yellow-200 m-0 min-w-[100px]">
										Location:
									</Text>
									<Text className="text-sm text-yellow-800 dark:text-yellow-200 m-0 font-mono">
										{suspiciousActivity.location}
									</Text>
								</div>

								<div className="flex justify-between mb-2">
									<Text className="text-sm font-semibold text-yellow-800 dark:text-yellow-200 m-0 min-w-[100px]">
										IP Address:
									</Text>
									<Text className="text-sm text-yellow-800 dark:text-yellow-200 m-0 font-mono">
										{suspiciousActivity.ipAddress}
									</Text>
								</div>

								<div className="flex justify-between mb-2">
									<Text className="text-sm font-semibold text-yellow-800 dark:text-yellow-200 m-0 min-w-[100px]">
										Device:
									</Text>
									<Text className="text-sm text-yellow-800 dark:text-yellow-200 m-0 font-mono">
										{suspiciousActivity.device}
									</Text>
								</div>

								<div className="flex justify-between">
									<Text className="text-sm font-semibold text-yellow-800 dark:text-yellow-200 m-0 min-w-[100px]">
										Time:
									</Text>
									<Text className="text-sm text-yellow-800 dark:text-yellow-200 m-0 font-mono">
										{suspiciousActivity.timestamp}
									</Text>
								</div>
							</div>
						</Card>
					)}

					{/* Immediate Actions Required */}
					<Card>
						<Text className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 m-0 mb-4">
							⚡ Immediate Actions Required
						</Text>
						<div className="mt-4">
							{immediateActions.map((action) => (
								<div
									key={action.title}
									className={`p-4 mb-4 bg-gray-50 dark:bg-gray-800 rounded-lg ${
										action.urgent
											? "border-l-4 border-red-500 dark:border-red-400"
											: "border-l-4 border-green-600 dark:border-green-400"
									}`}
								>
									<div className="mb-2">
										<Text className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100 m-0">
											{action.urgent && (
												<span className="text-red-500 dark:text-red-400 font-bold">
													URGENT:{" "}
												</span>
											)}
											{action.title}
										</Text>
									</div>

									<Text className="text-sm text-gray-600 dark:text-gray-400 m-0 leading-relaxed">
										{action.description}
									</Text>

									{action.actionUrl && action.actionText && (
										<div className="mt-3">
											<Button
												href={action.actionUrl}
												variant={action.urgent ? "primary" : "secondary"}
											>
												{action.actionText}
											</Button>
										</div>
									)}
								</div>
							))}
						</div>
					</Card>

					{/* Preventive Measures */}
					<Card>
						<Text className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 m-0 mb-4">
							🛡️ Recommended Preventive Measures
						</Text>
						<div className="mt-4">
							{preventiveMeasures.map((measure) => (
								<div key={measure} className="flex items-start mb-3">
									<span className="text-green-600 dark:text-green-400 font-bold mr-3 text-sm mt-0.5">
										✓
									</span>
									<Text className="text-sm text-gray-700 dark:text-gray-300 m-0 leading-relaxed">
										{measure}
									</Text>
								</div>
							))}
						</div>
					</Card>

					{/* Response Timeline */}
					{timeline && timeline.length > 0 && (
						<Card>
							<Text className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 m-0 mb-4">
								📅 Response Timeline
							</Text>
							<div className="mt-4 relative">
								{timeline.map((item) => (
									<div key={item.time} className="flex mb-4 relative">
										<div className="relative mr-4 mt-1">
											<div
												className={`w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 shadow-sm shadow-gray-300 dark:shadow-gray-600 ${
													item.status === "completed"
														? "bg-green-600 dark:bg-green-500"
														: item.status === "in_progress"
															? "bg-yellow-500 dark:bg-yellow-400"
															: "bg-gray-400 dark:bg-gray-500"
												}`}
											/>
										</div>

										<div className="flex-1">
											<Text className="text-xs font-semibold text-gray-600 dark:text-gray-400 m-0 mb-1 uppercase">
												{item.time}
											</Text>
											<Text className="text-sm text-gray-700 dark:text-gray-300 m-0 mb-1 leading-snug">
												{item.event}
											</Text>
											<Text className="text-xs text-gray-500 dark:text-gray-500 m-0 font-medium">
												{item.status.replace("_", " ").toUpperCase()}
											</Text>
										</div>
									</div>
								))}
							</div>
						</Card>
					)}

					{/* Security Resources */}
					{resources && resources.length > 0 && (
						<Card>
							<Text className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 m-0 mb-4">
								📚 Security Resources
							</Text>
							<div className="mt-4">
								{resources.map((resource) => (
									<div
										key={resource.title}
										className="mb-4 pb-3 border-b border-gray-200 dark:border-gray-700"
									>
										<Link
											href={resource.url}
											className="text-sm font-semibold text-green-600 dark:text-green-400 no-underline block mb-1 hover:text-green-700 dark:hover:text-green-300 transition-colors"
										>
											{resource.title}
										</Link>
										<Text className="text-sm text-gray-600 dark:text-gray-400 m-0 leading-snug">
											{resource.description}
										</Text>
									</div>
								))}
							</div>
						</Card>
					)}

					{/* Contact Information */}
					<div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border border-red-200 dark:border-red-800 my-6">
						<Text className="text-lg md:text-xl font-bold text-red-800 dark:text-red-200 m-0 mb-2">
							🚨 Security Team Contact
						</Text>
						<Text className="text-sm text-red-700 dark:text-red-300 m-0 mb-4">
							If you have any concerns or need immediate assistance:
						</Text>

						<div className="mt-3">
							<div className="flex items-center mb-2">
								<Text className="text-sm font-semibold text-red-700 dark:text-red-300 m-0 mr-3 min-w-[120px]">
									Security Team:
								</Text>
								<Link
									href={`mailto:${contact.securityTeam}`}
									className="text-red-600 dark:text-red-400 no-underline font-medium hover:text-red-700 dark:hover:text-red-300 transition-colors"
								>
									{contact.securityTeam}
								</Link>
							</div>

							{contact.reportUrl && (
								<div className="flex items-center mb-2">
									<Text className="text-sm font-semibold text-red-700 dark:text-red-300 m-0 mr-3 min-w-[120px]">
										Report Issues:
									</Text>
									<Link
										href={contact.reportUrl}
										className="text-red-600 dark:text-red-400 no-underline font-medium hover:text-red-700 dark:hover:text-red-300 transition-colors"
									>
										Security Report Portal
									</Link>
								</div>
							)}

							{contact.emergencyContact && (
								<div className="flex items-center mb-2">
									<Text className="text-sm font-semibold text-red-700 dark:text-red-300 m-0 mr-3 min-w-[120px]">
										Emergency:
									</Text>
									<Link
										href={`mailto:${contact.emergencyContact}`}
										className="text-red-600 dark:text-red-400 no-underline font-medium hover:text-red-700 dark:hover:text-red-300 transition-colors"
									>
										{contact.emergencyContact}
									</Link>
								</div>
							)}
						</div>
					</div>

					<Hr className="border-0 border-t border-gray-300 dark:border-gray-700 my-8" />

					<Text className="text-sm text-gray-600 dark:text-gray-400 text-center m-0 leading-relaxed">
						{recipientName}, your security is our top priority. We are taking
						this matter seriously and will keep you updated on our progress.
					</Text>
				</Container>
			</EmailLayout>
		</Html>
	);
}
