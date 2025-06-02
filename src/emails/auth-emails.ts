import { EmailError, ErrorCode } from "../lib/errors";
import { sendEmail } from "./send";

// Import email templates with named exports
import { LoginNotification } from "./templates/auth/login-notification";
import { PasswordReset } from "./templates/auth/password-reset";
import { VerifyEmail } from "./templates/auth/verify-email";
import { WelcomeEmail } from "./templates/auth/welcome";

export interface EmailServiceResponse {
	id: string;
	success: boolean;
}

/**
 * Email utility for authentication-related emails
 * Uses auth-specific sender configuration
 */
const fromEmail = "auth@tamatar.dev";
const fromName = "Tamatar Security";

export const AuthEmailService = {
	/**
	 * Send welcome email to new users
	 */
	async sendWelcomeEmail(params: {
		to: string;
		username: string;
		verificationUrl: string;
	}): Promise<EmailServiceResponse> {
		try {
			return await sendEmail({
				to: params.to,
				from: `${fromName} <${fromEmail}>`,
				subject: "Welcome to Tamatar! 🚀",
				react: await WelcomeEmail({
					username: params.username,
					verificationUrl: params.verificationUrl,
				}),
			});
		} catch (error) {
			throw new EmailError(
				`Failed to send welcome email to ${params.to}`,
				ErrorCode.EMAIL_SEND_FAILED,
				{ recipient: params.to, emailType: "welcome" },
			);
		}
	},

	/**
	 * Send email verification email
	 */
	async sendVerificationEmail(params: {
		to: string;
		username: string;
		verificationUrl: string;
	}): Promise<EmailServiceResponse> {
		try {
			return await sendEmail({
				to: params.to,
				from: `${fromName} <${fromEmail}>`,
				subject: "Verify your Tamatar account",
				react: await VerifyEmail({
					username: params.username,
					verificationUrl: params.verificationUrl,
				}),
			});
		} catch (error) {
			throw new EmailError(
				`Failed to send verification email to ${params.to}`,
				ErrorCode.EMAIL_SEND_FAILED,
				{ recipient: params.to, emailType: "verification" },
			);
		}
	},

	/**
	 * Send password reset email
	 */
	async sendPasswordResetEmail(params: {
		to: string;
		username: string;
		resetUrl: string;
		ipAddress?: string;
		userAgent?: string;
	}): Promise<EmailServiceResponse> {
		try {
			return await sendEmail({
				to: params.to,
				from: `${fromName} <${fromEmail}>`,
				subject: "Reset your Tamatar password",
				react: await PasswordReset({
					username: params.username,
					resetUrl: params.resetUrl,
					ipAddress: params.ipAddress,
					userAgent: params.userAgent,
				}),
			});
		} catch (error) {
			throw new EmailError(
				`Failed to send password reset email to ${params.to}`,
				ErrorCode.EMAIL_SEND_FAILED,
				{ recipient: params.to, emailType: "password-reset" },
			);
		}
	},

	/**
	 * Send login notification email (for security purposes)
	 */
	async sendLoginNotification(params: {
		to: string;
		username: string;
		loginTime: string;
		ipAddress?: string;
		location?: string;
		device?: string;
		browser?: string;
		isNewDevice?: boolean;
	}): Promise<EmailServiceResponse> {
		try {
			return await sendEmail({
				to: params.to,
				from: `${fromName} <${fromEmail}>`,
				subject: "New login to your Tamatar account",
				react: await LoginNotification({
					username: params.username,
					loginTime: params.loginTime,
					ipAddress: params.ipAddress,
					location: params.location,
					device: params.device,
					browser: params.browser,
					isNewDevice: params.isNewDevice,
				}),
			});
		} catch (error) {
			throw new EmailError(
				`Failed to send login notification to ${params.to}`,
				ErrorCode.EMAIL_SEND_FAILED,
				{ recipient: params.to, emailType: "login-notification" },
			);
		}
	},
};
