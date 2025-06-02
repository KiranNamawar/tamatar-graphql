import { emailConfig } from "@/lib/env";
import { EmailError, ErrorCode } from "@/lib/errors";
import { render } from "@react-email/components";
import type { ReactNode } from "react";

/**
 * Plunk API response interface
 */
interface PlunkResponse {
	success: boolean;
	contact: string;
	message: string;
	emails: Array<{
		id: string;
		to: string;
		from: string;
		subject: string;
		body: string;
		delivered: boolean;
		opened: boolean;
		clicked: boolean;
		bounced: boolean;
		created_at: string;
	}>;
}

/**
 * Plunk API error response interface
 */
interface PlunkErrorResponse {
	success: false;
	error: string;
}

/**
 * Core email sending function using Plunk REST API
 *
 * @param props Email properties including recipient, sender, subject, and React content
 * @returns Promise resolving to email response
 * @throws EmailError when email sending fails
 */
async function sendEmail(props: {
	to: string;
	from: string;
	subject: string;
	react: ReactNode;
}): Promise<{ id: string; success: boolean }> {
	try {
		// Render React component to HTML
		const html = await render(props.react);

		// Send email via Plunk REST API
		const response = await fetch("https://api.useplunk.com/v1/send", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${emailConfig.pluckApiKey}`,
			},
			body: JSON.stringify({
				to: props.to,
				from: props.from,
				subject: props.subject,
				body: html,
			}),
		});

		// Parse response
		const data = (await response.json()) as PlunkResponse | PlunkErrorResponse;

		// Handle success response
		if (response.ok && data.success && "emails" in data) {
			const emailId = data.emails[0]?.id || "unknown";
			return {
				id: emailId,
				success: true,
			};
		}

		// Handle error response
		const errorData = data as PlunkErrorResponse;
		throw new EmailError(
			errorData.error || "Email service returned failure response",
			ErrorCode.EMAIL_SEND_FAILED,
			{
				response: data,
				recipient: props.to,
				statusCode: response.status,
			},
		);
	} catch (error) {
		if (error instanceof EmailError) {
			throw error;
		}

		// Handle fetch errors
		if (error instanceof TypeError && error.message.includes("fetch")) {
			throw new EmailError(
				"Failed to connect to email service",
				ErrorCode.EMAIL_SERVICE_UNAVAILABLE,
				{ recipient: props.to, originalError: error.message },
			);
		}

		// Handle different types of errors
		if (error instanceof Error) {
			if (
				error.message.includes("rate limit") ||
				error.message.includes("429")
			) {
				throw new EmailError(
					"Email rate limit exceeded. Please try again later.",
					ErrorCode.RATE_LIMIT_EXCEEDED,
					{ recipient: props.to, originalError: error.message },
				);
			}

			if (error.message.includes("invalid") || error.message.includes("400")) {
				throw new EmailError(
					"Invalid email configuration or recipient address",
					ErrorCode.VALIDATION_ERROR,
					{ recipient: props.to, originalError: error.message },
				);
			}

			if (
				error.message.includes("401") ||
				error.message.includes("unauthorized")
			) {
				throw new EmailError(
					"Email service authentication failed",
					ErrorCode.EMAIL_SEND_FAILED,
					{ recipient: props.to, originalError: error.message },
				);
			}
		}

		throw new EmailError(
			"Failed to send email due to service error",
			ErrorCode.EMAIL_SERVICE_UNAVAILABLE,
			{ recipient: props.to, originalError: error },
		);
	}
}

export { sendEmail };
