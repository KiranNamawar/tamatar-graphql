import { Section } from "@react-email/components";
import type { ReactNode } from "react";

interface CardProps {
	children: ReactNode;
	className?: string;
	padding?: "small" | "medium" | "large";
}

/**
 * Card component for grouping related content with consistent styling.
 * Provides proper spacing and visual separation.
 */
export function Card({
	children,
	className = "",
	padding = "medium",
}: CardProps) {
	const paddingStyles = {
		small: "p-4",
		medium: "p-6",
		large: "p-8",
	};

	const baseStyles = "bg-white border border-gray-200 rounded-xl shadow-sm";
	const combinedClassName = `${baseStyles} ${paddingStyles[padding]} ${className}`;

	return (
		<Section
			className={combinedClassName}
			style={{
				// Fallback styles for email clients
				backgroundColor: "#ffffff",
				border: "1px solid #e5e7eb",
				borderRadius: "12px",
				boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
				...(padding === "small" && { padding: "16px" }),
				...(padding === "medium" && { padding: "24px" }),
				...(padding === "large" && { padding: "32px" }),
			}}
		>
			{children}
		</Section>
	);
}
