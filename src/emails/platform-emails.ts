import { EmailError, ErrorCode } from "@/lib/errors";
import { sendEmail } from "./send";

// Import email templates and their props
import { FeatureAnnouncementEmail, type FeatureAnnouncementEmailProps } from "./templates/platform/feature-announcement";
import MaintenanceEmail, { type MaintenanceEmailProps } from "./templates/platform/maintenance";
import { SecurityAlertEmail, type SecurityAlertEmailProps } from "./templates/platform/security-alert";
import AccountChangeEmail, { type AccountChangeEmailProps } from "./templates/platform/account-change";

// Export the return type for consistency across email services
export interface EmailServiceResponse {
	id: string;
	success: boolean;
}

const fromEmail = "platform@tamatar.dev";
const fromName = "Tamatar Platform";

export const PlatformEmailService = {
	/**
	 * Send feature announcement email
	 */
	async sendFeatureAnnouncement(params: {
		to: string;
	} & FeatureAnnouncementEmailProps): Promise<EmailServiceResponse> {
		try {
			const { to, ...reactProps } = params;
			return await sendEmail({
				to: to,
				from: `${fromName} <${fromEmail}>`,
				subject: `🎉 New Feature: ${reactProps.featureName}`,
				react: FeatureAnnouncementEmail(reactProps),
			});
		} catch (error) {
			throw new EmailError(
				`Failed to send feature announcement to ${params.to}`,
				ErrorCode.EMAIL_SEND_FAILED,
				{ recipient: params.to, emailType: "feature-announcement" },
			);
		}
	},

	/**
	 * Send maintenance alert email
	 */
	async sendMaintenanceAlert(params: {
		to: string;
		maintenanceTypeInput: "planned" | "emergency" | "ongoing" | "completed"; // To map to template's type
	} & Omit<MaintenanceEmailProps, 'maintenanceType'>): Promise<EmailServiceResponse> {
		try {
			const { to, maintenanceTypeInput, ...reactProps } = params;

			let serviceMaintenanceType: MaintenanceEmailProps['maintenanceType'];
			switch (maintenanceTypeInput) {
				case "planned":
				case "ongoing":
					serviceMaintenanceType = "scheduled";
					break;
				case "emergency":
					serviceMaintenanceType = "emergency";
					break;
				case "completed":
					serviceMaintenanceType = "completed";
					break;
				default:
					serviceMaintenanceType = "scheduled"; // Fallback, though TS should prevent this
			}

			let subject = "";
			switch (serviceMaintenanceType) {
				case "scheduled":
					subject = `🔧 Scheduled Maintenance: ${reactProps.title}`;
					break;
				case "emergency":
					subject = `🚨 Emergency Maintenance: ${reactProps.title}`;
					break;
				case "completed":
					subject = `✅ Maintenance Complete: ${reactProps.title}`;
					break;
			}

			return await sendEmail({
				to: to,
				from: `${fromName} <${fromEmail}>`,
				subject,
				react: MaintenanceEmail({ ...reactProps, maintenanceType: serviceMaintenanceType }),
			});
		} catch (error) {
			throw new EmailError(
				`Failed to send maintenance alert to ${params.to}`,
				ErrorCode.EMAIL_SEND_FAILED,
				{ recipient: params.to, emailType: "maintenance-alert" },
			);
		}
	},

	/**
	 * Send security alert email
	 */
	async sendSecurityAlert(params: {
		to: string;
	} & SecurityAlertEmailProps): Promise<EmailServiceResponse> {
		try {
			const { to, ...reactProps } = params;
			let subjectPrefix = "🛡️";
			if (reactProps.severity === "high" || reactProps.severity === "critical") {
				subjectPrefix = "🚨";
			}
			return await sendEmail({
				to: to,
				from: `${fromName} <${fromEmail}>`,
				subject: `${subjectPrefix} Security Alert: ${reactProps.title}`,
				react: SecurityAlertEmail(reactProps),
			});
		} catch (error) {
			throw new EmailError(
				`Failed to send security alert to ${params.to}`,
				ErrorCode.EMAIL_SEND_FAILED,
				{ recipient: params.to, emailType: "security-alert" },
			);
		}
	},

	/**
	 * Send account change notification email
	 */
	async sendAccountChangeNotification(params: {
		to: string;
	} & AccountChangeEmailProps): Promise<EmailServiceResponse> {
		try {
			const { to, ...reactProps } = params;
			const changeTypeDescriptions: Record<AccountChangeEmailProps['changeType'], string> = {
				email: "Email Address Changed",
				password: "Password Changed",
				username: "Username Changed",
				profile: "Profile Updated",
				privacy: "Privacy Settings Updated",
				deactivation: "Account Deactivated",
			};
			const subject = `🔒 Account Update: ${changeTypeDescriptions[reactProps.changeType] || 'Account Information Changed'}`;

			return await sendEmail({
				to: to,
				from: `${fromName} <${fromEmail}>`,
				subject,
				react: AccountChangeEmail(reactProps),
			});
		} catch (error) {
			throw new EmailError(
				`Failed to send account change notification to ${params.to}`,
				ErrorCode.EMAIL_SEND_FAILED,
				{ recipient: params.to, emailType: "account-change" },
			);
		}
	},
};
