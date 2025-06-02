import { Section, Text } from "@react-email/components";
import type { ReactNode } from "react";

interface AlertProps {
	children: ReactNode;
	variant?: "info" | "success" | "warning" | "error";
	className?: string;
}

/**
 * Alert component for displaying important information with appropriate
 * visual styling and accessibility considerations.
 */
export function Alert({
	children,
	variant = "info",
	className = "",
}: AlertProps) {
	const getVariantStyles = (variant: AlertProps["variant"]) => {
		const baseStyles = "p-4 rounded-lg border-l-4 mb-6";

		switch (variant) {
			case "success":
				return `${baseStyles} bg-green-50 border-l-green-500 border-green-200`;
			case "warning":
				return `${baseStyles} bg-yellow-50 border-l-yellow-500 border-yellow-200`;
			case "error":
				return `${baseStyles} bg-red-50 border-l-red-500 border-red-200`;
			case "info":
				return `${baseStyles} bg-blue-50 border-l-blue-500 border-blue-200`;
		}
	};

	const getTextColor = (variant: AlertProps["variant"]) => {
		switch (variant) {
			case "success":
				return "text-green-800";
			case "warning":
				return "text-yellow-800";
			case "error":
				return "text-red-800";
			case "info":
				return "text-blue-800";
		}
	};

	return (
		<Section className={`${getVariantStyles(variant)} ${className}`}>
			<Text className={`${getTextColor(variant)} text-sm leading-relaxed m-0`}>
				{children}
			</Text>
		</Section>
	);
}
