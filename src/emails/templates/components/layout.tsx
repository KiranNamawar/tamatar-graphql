import {
	Body,
	Container,
	Head,
	Html,
	Preview,
	Tailwind,
} from "@react-email/components";
import type { ReactNode } from "react";
import { EmailFooter } from "./footer";
import { EmailHeader } from "./header";

interface EmailLayoutProps {
	children: ReactNode;
	preview: string;
	title?: string;
}

/**
 * Base email layout wrapper that provides consistent structure and styling
 * for all Tamatar email templates.
 */
export function EmailLayout({ children, preview, title }: EmailLayoutProps) {
	return (
		<Html>
			<Head>{title && <title>{title}</title>}</Head>
			<Preview>{preview}</Preview>
			<Tailwind
				config={{
					theme: {
						extend: {
							colors: {
								// Primary colors
								primary: {
									50: "#ecfdf5",
									100: "#d1fae5",
									500: "#10b981",
									600: "#059669",
									900: "#064e3b",
								},
								// Neutral colors
								gray: {
									50: "#f9fafb",
									100: "#f3f4f6",
									200: "#e5e7eb",
									300: "#d1d5db",
									400: "#9ca3af",
									500: "#6b7280",
									600: "#4b5563",
									700: "#374151",
									800: "#1f2937",
									900: "#111827",
								},
								// Status colors
								success: "#10b981",
								warning: "#f59e0b",
								error: "#ef4444",
								info: "#3b82f6",
							},
							fontFamily: {
								sans: [
									"-apple-system",
									"BlinkMacSystemFont",
									"Segoe UI",
									"Roboto",
									"Oxygen",
									"Ubuntu",
									"Cantarell",
									"sans-serif",
								],
							},
							spacing: {
								xs: "4px",
								sm: "8px",
								md: "16px",
								lg: "24px",
								xl: "32px",
								"2xl": "48px",
								"3xl": "64px",
							},
						},
					},
				}}
			>
				<Body className="bg-gray-50 font-sans">
					<Container className="max-w-[600px] mx-auto bg-white">
						<EmailHeader />
						<div className="px-6 py-8">{children}</div>
						<EmailFooter />
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}
