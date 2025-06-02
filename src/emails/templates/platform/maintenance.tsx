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
import { EmailLayout, Card, Alert } from "../components";

export interface MaintenanceEmailProps {
	recipientName: string;
	maintenanceType: "scheduled" | "emergency" | "completed";
	title: string;
	description: string;
	startTime: string;
	endTime: string;
	timezone: string;
	duration: string;
	affectedServices: string[];
	expectedImpact: "none" | "minimal" | "moderate" | "significant";
	alternativeAccess?: {
		available: boolean;
		description?: string;
		url?: string;
	};
	preparation?: {
		recommendations: string[];
		dataBackup?: boolean;
	};
	updates?: {
		statusPageUrl: string;
		notificationChannels: string[];
	};
	contact?: {
		supportEmail: string;
		emergencyContact?: string;
	};
}

export function MaintenanceEmail({
	recipientName,
	maintenanceType,
	title,
	description,
	startTime,
	endTime,
	timezone,
	duration,
	affectedServices,
	expectedImpact,
	alternativeAccess,
	preparation,
	updates,
	contact,
}: MaintenanceEmailProps) {
	const getMaintenanceIcon = () => {
		switch (maintenanceType) {
			case "scheduled":
				return "🔧";
			case "emergency":
				return "🚨";
			case "completed":
				return "✅";
			default:
				return "🛠️";
		}
	};

	const getMaintenanceColorClass = () => {
		switch (maintenanceType) {
			case "scheduled":
				return "bg-emerald-500 dark:bg-emerald-600";
			case "emergency":
				return "bg-red-500 dark:bg-red-600";
			case "completed":
				return "bg-emerald-600 dark:bg-emerald-700";
			default:
				return "bg-gray-500 dark:bg-gray-600";
		}
	};

	const getImpactColorClass = () => {
		switch (expectedImpact) {
			case "none":
				return "text-emerald-500 dark:text-emerald-400";
			case "minimal":
				return "text-amber-500 dark:text-amber-400";
			case "moderate":
				return "text-orange-500 dark:text-orange-400";
			case "significant":
				return "text-red-500 dark:text-red-400";
			default:
				return "text-gray-500 dark:text-gray-400";
		}
	};

	const previewText = `${maintenanceType === "completed" ? "Completed" : "Upcoming"} Maintenance: ${title}`;

	return (
		<Html>
			<Head />
			<Preview>{previewText}</Preview>
			<EmailLayout preview={previewText}>
				<Container className="max-w-2xl mx-auto bg-white dark:bg-gray-900">
					{/* Header Section */}
					<div
						className={`text-center p-8 rounded-xl mb-6 ${getMaintenanceColorClass()}`}
					>
						<Text className="text-5xl mb-3">{getMaintenanceIcon()}</Text>
						<Text className="text-xl md:text-2xl font-bold text-white mb-2">
							{maintenanceType === "completed"
								? "Maintenance Completed"
								: "Maintenance Notice"}
						</Text>
						<Text className="text-base md:text-lg text-white opacity-90">
							{title}
						</Text>
					</div>{" "}
					{/* Alert based on maintenance type */}
					{maintenanceType === "emergency" && (
						<Alert variant="error">
							<Text className="text-sm leading-relaxed">
								<span className="font-semibold">Emergency Maintenance:</span>{" "}
								This maintenance is being performed to address a critical issue.
								We apologize for any inconvenience.
							</Text>
						</Alert>
					)}
					{maintenanceType === "completed" && (
						<Alert variant="success">
							<Text className="text-sm leading-relaxed">
								<span className="font-semibold">Maintenance Complete:</span> All
								services have been restored and are operating normally.
							</Text>
						</Alert>
					)}
					{/* Main Information */}
					<Card>
						<Text className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
							📋 Maintenance Details
						</Text>
						<Text className="text-sm text-gray-700 dark:text-gray-300 mb-5 leading-relaxed">
							{description}
						</Text>

						<div className="space-y-3">
							<div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
								<Text className="text-sm font-semibold text-gray-800 dark:text-gray-200">
									Start Time:
								</Text>
								<Text className="text-sm text-gray-700 dark:text-gray-300">
									{startTime}
								</Text>
							</div>

							<div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
								<Text className="text-sm font-semibold text-gray-800 dark:text-gray-200">
									End Time:
								</Text>
								<Text className="text-sm text-gray-700 dark:text-gray-300">
									{endTime}
								</Text>
							</div>

							<div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
								<Text className="text-sm font-semibold text-gray-800 dark:text-gray-200">
									Timezone:
								</Text>
								<Text className="text-sm text-gray-700 dark:text-gray-300">
									{timezone}
								</Text>
							</div>

							<div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
								<Text className="text-sm font-semibold text-gray-800 dark:text-gray-200">
									Duration:
								</Text>
								<Text className="text-sm text-gray-700 dark:text-gray-300">
									{duration}
								</Text>
							</div>

							<div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
								<Text className="text-sm font-semibold text-gray-800 dark:text-gray-200">
									Expected Impact:
								</Text>
								<Text
									className={`text-sm font-semibold capitalize ${getImpactColorClass()}`}
								>
									{expectedImpact}
								</Text>
							</div>
						</div>
					</Card>{" "}
					{/* Affected Services */}
					<Card>
						<Text className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
							🎯 Affected Services
						</Text>
						<div className="mt-3">
							{affectedServices.map((service) => (
								<div key={service} className="flex items-center mb-2">
									<span className="text-emerald-500 dark:text-emerald-400 font-bold mr-3 text-base">
										•
									</span>
									<Text className="text-sm text-gray-800 dark:text-gray-200">
										{service}
									</Text>
								</div>
							))}
						</div>
					</Card>
					{/* Alternative Access */}
					{alternativeAccess?.available && (
						<Card>
							<Text className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
								🔄 Alternative Access
							</Text>
							<Text className="text-sm text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
								{alternativeAccess.description}
							</Text>
							{alternativeAccess.url && (
								<div className="mt-3">
									<Link
										href={alternativeAccess.url}
										className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 font-medium transition-colors duration-200"
									>
										Access Alternative Service →
									</Link>
								</div>
							)}
						</Card>
					)}{" "}
					{/* Preparation Recommendations */}
					{preparation && preparation.recommendations.length > 0 && (
						<Card>
							<Text className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
								💡 Preparation Recommendations
							</Text>
							{preparation.dataBackup && (
								<Alert variant="warning">
									<Text className="text-sm leading-relaxed mb-4">
										<span className="font-semibold">Important:</span> We
										recommend backing up any critical data before the
										maintenance window.
									</Text>
								</Alert>
							)}

							<div className="mt-4">
								{preparation.recommendations.map((recommendation) => (
									<div key={recommendation} className="flex items-start mb-2">
										<span className="text-emerald-500 dark:text-emerald-400 font-bold mr-3 text-sm mt-0.5">
											✓
										</span>
										<Text className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
											{recommendation}
										</Text>
									</div>
								))}
							</div>
						</Card>
					)}{" "}
					{/* Status Updates */}
					{updates && (
						<Card>
							<Text className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
								📡 Stay Updated
							</Text>
							<Text className="text-sm text-gray-700 dark:text-gray-300 mb-4">
								For real-time updates during the maintenance window:
							</Text>

							<div className="mt-3">
								<div className="flex items-center mb-2">
									<Text className="text-sm font-semibold text-gray-800 dark:text-gray-200 mr-3 min-w-[100px]">
										Status Page:
									</Text>
									<Link
										href={updates.statusPageUrl}
										className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 font-medium transition-colors duration-200"
									>
										View Current Status
									</Link>
								</div>

								<div className="flex items-center mb-2">
									<Text className="text-sm font-semibold text-gray-800 dark:text-gray-200 mr-3 min-w-[100px]">
										Updates via:
									</Text>
									<Text className="text-sm text-gray-700 dark:text-gray-300">
										{updates.notificationChannels.join(", ")}
									</Text>
								</div>
							</div>
						</Card>
					)}{" "}
					{/* Contact Information */}
					{contact && (
						<div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg my-6">
							<Text className="text-base font-bold text-gray-800 dark:text-gray-100 mb-2">
								📞 Need Help?
							</Text>
							<Text className="text-sm text-gray-600 dark:text-gray-400 mb-4">
								If you have questions or need assistance:
							</Text>

							<div className="mt-3">
								<div className="flex items-center mb-2">
									<Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mr-3 min-w-[80px]">
										Support:
									</Text>
									<Link
										href={`mailto:${contact.supportEmail}`}
										className="text-emerald-500 dark:text-emerald-400 no-underline font-medium"
									>
										{contact.supportEmail}
									</Link>
								</div>

								{contact.emergencyContact && (
									<div className="flex items-center mb-2">
										<Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 mr-3 min-w-[80px]">
											Emergency:
										</Text>
										<Link
											href={`mailto:${contact.emergencyContact}`}
											className="text-emerald-500 dark:text-emerald-400 no-underline font-medium"
										>
											{contact.emergencyContact}
										</Link>
									</div>
								)}
							</div>
						</div>
					)}
					<Hr className="border-0 border-t border-gray-200 dark:border-gray-700 my-8" />
					<Text className="text-sm text-gray-600 dark:text-gray-400 text-center italic">
						Thank you for your patience, {recipientName}. We appreciate your
						understanding as we work to improve Tamatar.
					</Text>
				</Container>
			</EmailLayout>
		</Html>
	);
}

export default MaintenanceEmail;
