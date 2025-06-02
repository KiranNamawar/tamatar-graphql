import {
	EmailLayout,
	EmailHeader,
	EmailFooter,
	Button,
	Card,
	Alert,
} from "../components";

interface AccountChangeEmailProps {
	username: string;
	changeType:
		| "email"
		| "password"
		| "username"
		| "profile"
		| "privacy"
		| "deactivation";
	oldValue?: string;
	newValue?: string;
	ipAddress?: string;
	location?: string;
	device?: string;
	timestamp: string;
	wasInitiatedByUser: boolean;
	loginUrl: string;
	supportUrl: string;
	securityUrl: string;
}

export type { AccountChangeEmailProps };

const changeTypeConfig = {
	email: {
		title: "Email Address Changed",
		icon: "📧",
		severity: "high" as const,
		description: "Your account email address has been updated",
		securityNote: "This affects how you log in and receive notifications",
	},
	password: {
		title: "Password Changed",
		icon: "🔐",
		severity: "high" as const,
		description: "Your account password has been updated",
		securityNote: "You may need to log in again on other devices",
	},
	username: {
		title: "Username Changed",
		icon: "👤",
		severity: "medium" as const,
		description: "Your username has been updated",
		securityNote: "This affects your public profile URL",
	},
	profile: {
		title: "Profile Updated",
		icon: "✏️",
		severity: "low" as const,
		description: "Your profile information has been updated",
		securityNote: "Changes are reflected on your public profile",
	},
	privacy: {
		title: "Privacy Settings Changed",
		icon: "🔒",
		severity: "medium" as const,
		description: "Your privacy settings have been updated",
		securityNote: "This affects who can see your content and data",
	},
	deactivation: {
		title: "Account Deactivated",
		icon: "⏸️",
		severity: "critical" as const,
		description: "Your account has been deactivated",
		securityNote: "Your profile and data are hidden but can be restored",
	},
};

export function AccountChangeEmail({
	username,
	changeType,
	oldValue,
	newValue,
	ipAddress,
	location,
	device,
	timestamp,
	wasInitiatedByUser,
	loginUrl,
	supportUrl,
	securityUrl,
}: AccountChangeEmailProps) {
	const config = changeTypeConfig[changeType];
	const alertVariant =
		config.severity === "critical"
			? "error"
			: config.severity === "high"
				? "warning"
				: config.severity === "medium"
					? "info"
					: "success";
	const formatValue = (value: string) => {
		if (changeType === "email") {
			// Partially mask email for security
			const parts = value.split("@");
			const local = parts[0];
			const domain = parts[1];
			if (local && domain) {
				return `${local.charAt(0)}${"*".repeat(Math.max(0, local.length - 2))}${local.slice(-1)}@${domain}`;
			}
		}
		return value;
	};

	const previewText = `${config.title} - Security notification for your Tamatar account`;
	return (
		<EmailLayout preview={previewText}>
			<EmailHeader />
			<div className="p-8 md:px-6">
				{/* Alert Banner */}
				<Alert variant={alertVariant}>
					<div className="flex items-center gap-2">
						<span className="text-xl">{config.icon}</span>
						<strong>{config.title}</strong>
					</div>
				</Alert>
				{/* Main Content */}
				<div className="mb-8">
					<h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4 leading-8">
						Account Change Notification
					</h1>
					<p className="text-base text-gray-700 dark:text-gray-300 leading-6 mb-6">
						Hi {username},
					</p>
					<p className="text-base text-gray-700 dark:text-gray-300 leading-6 mb-6">
						{config.description}. {config.securityNote}.
					</p>
				</div>{" "}
				{/* Change Details */}
				<Card>
					<div className="mb-6">
						<h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
							Change Details
						</h2>
						<div className="mb-4">
							<div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
								<span className="text-gray-500 dark:text-gray-400 text-sm">
									Change Type:
								</span>
								<span className="text-gray-900 dark:text-gray-100 font-medium">
									{config.title}
								</span>
							</div>
							{oldValue && newValue && (
								<>
									<div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
										<span className="text-gray-500 dark:text-gray-400 text-sm">
											Previous Value:
										</span>
										<span className="text-red-600 dark:text-red-400 font-mono text-sm">
											{formatValue(oldValue)}
										</span>
									</div>
									<div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
										<span className="text-gray-500 dark:text-gray-400 text-sm">
											New Value:
										</span>
										<span className="text-emerald-600 dark:text-emerald-400 font-mono text-sm">
											{formatValue(newValue)}
										</span>
									</div>
								</>
							)}
							<div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
								<span className="text-gray-500 dark:text-gray-400 text-sm">
									Time:
								</span>
								<span className="text-gray-900 dark:text-gray-100">
									{new Date(timestamp).toLocaleString()}
								</span>
							</div>
							<div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
								<span className="text-gray-500 dark:text-gray-400 text-sm">
									Initiated By:
								</span>
								<span
									className={`font-medium ${
										wasInitiatedByUser
											? "text-emerald-600 dark:text-emerald-400"
											: "text-red-600 dark:text-red-400"
									}`}
								>
									{wasInitiatedByUser ? "You" : "System/Admin"}
								</span>
							</div>
							{(ipAddress || location || device) && (
								<>
									{ipAddress && (
										<div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
											<span className="text-gray-500 dark:text-gray-400 text-sm">
												IP Address:
											</span>
											<span className="text-gray-900 dark:text-gray-100 font-mono">
												{ipAddress}
											</span>
										</div>
									)}
									{location && (
										<div className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
											<span className="text-gray-500 dark:text-gray-400 text-sm">
												Location:
											</span>
											<span className="text-gray-900 dark:text-gray-100">
												{location}
											</span>
										</div>
									)}
									{device && (
										<div className="flex justify-between items-center py-3">
											<span className="text-gray-500 dark:text-gray-400 text-sm">
												Device:
											</span>
											<span className="text-gray-900 dark:text-gray-100">
												{device}
											</span>
										</div>
									)}
								</>
							)}
						</div>
					</div>
				</Card>{" "}
				{/* Security Notice */}
				{!wasInitiatedByUser && (
					<div className="mb-6">
						<Alert variant="error">
							<div>
								<strong>⚠️ Unauthorized Change Detected</strong>
								<p className="mt-2 text-sm">
									This change was not initiated by you. If you did not authorize
									this change, please secure your account immediately.
								</p>
							</div>
						</Alert>
					</div>
				)}{" "}
				{/* Action Buttons */}
				<div className="flex flex-wrap gap-3 mb-8">
					{!wasInitiatedByUser && (
						<Button href={securityUrl} variant="primary">
							🔒 Secure My Account
						</Button>
					)}
					<Button
						href={loginUrl}
						variant={wasInitiatedByUser ? "primary" : "secondary"}
					>
						🔑 Sign In to Account
					</Button>
					<Button href={supportUrl} variant="secondary">
						📞 Contact Support
					</Button>
				</div>{" "}
				{/* Additional Information */}
				<Card>
					<h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-3">
						What to do next?
					</h3>
					<ul className="text-gray-700 dark:text-gray-300 text-sm leading-5 pl-5 m-0">
						{changeType === "password" && (
							<>
								<li>You may need to sign in again on other devices</li>
								<li>
									Update any saved passwords in your browser or password manager
								</li>
								<li>
									Enable two-factor authentication for additional security
								</li>
							</>
						)}
						{changeType === "email" && (
							<>
								<li>Use your new email address to sign in</li>
								<li>Update your email in any linked services</li>
								<li>Check your new email for future notifications</li>
							</>
						)}
						{changeType === "username" && (
							<>
								<li>Your new profile URL: tamatar.dev/@{newValue}</li>
								<li>Update any shared links to your profile</li>
								<li>Your old username is now available for others to use</li>
							</>
						)}
						{changeType === "deactivation" && (
							<>
								<li>Your profile and data are hidden but preserved</li>
								<li>You can reactivate your account anytime</li>
								<li>Contact support if you need help reactivating</li>
							</>
						)}
						{!wasInitiatedByUser && (
							<li className="text-red-600 dark:text-red-400 font-medium">
								Review your account security and change your password if needed
							</li>
						)}
					</ul>
				</Card>{" "}
				{/* Footer Note */}
				<div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
					<p className="text-sm text-gray-600 dark:text-gray-400 m-0 text-center">
						This is an automated security notification. If you have questions,
						please contact our support team.
					</p>
				</div>
			</div>
			<EmailFooter />
		</EmailLayout>
	);
}

export default AccountChangeEmail;
