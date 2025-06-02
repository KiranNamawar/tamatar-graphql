import { Button as EmailButton } from "@react-email/components";
import type { ReactNode } from "react";

interface ButtonProps {
	children: ReactNode;
	href: string;
	variant?: "primary" | "secondary";
	size?: "small" | "medium" | "large";
	className?: string;
}

/**
 * Reusable button component for emails with consistent styling.
 * Supports primary and secondary variants with proper contrast ratios.
 */
export function Button({
	children,
	href,
	variant = "primary",
	size = "medium",
	className = "",
}: ButtonProps) {
	const baseStyles =
		"inline-block text-center font-semibold rounded-lg no-underline transition-colors";

	const variantStyles = {
		primary: "bg-primary-500 text-white hover:bg-primary-600",
		secondary:
			"bg-transparent text-primary-500 border-2 border-primary-500 hover:bg-primary-50",
	};

	const sizeStyles = {
		small: "px-4 py-2 text-sm min-h-[36px]",
		medium: "px-6 py-3 text-base min-h-[44px]",
		large: "px-8 py-4 text-lg min-h-[52px]",
	};

	const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

	return (
		<EmailButton
			href={href}
			className={combinedClassName}
			style={{
				// Fallback styles for email clients that don't support Tailwind
				display: "inline-block",
				textAlign: "center",
				textDecoration: "none",
				borderRadius: "8px",
				fontWeight: "600",
				...(variant === "primary" && {
					backgroundColor: "#10b981",
					color: "#ffffff",
				}),
				...(variant === "secondary" && {
					backgroundColor: "transparent",
					color: "#10b981",
					border: "2px solid #10b981",
				}),
				...(size === "small" && {
					padding: "8px 16px",
					fontSize: "14px",
					minHeight: "36px",
				}),
				...(size === "medium" && {
					padding: "12px 24px",
					fontSize: "16px",
					minHeight: "44px",
				}),
				...(size === "large" && {
					padding: "16px 32px",
					fontSize: "18px",
					minHeight: "52px",
				}),
			}}
		>
			{children}
		</EmailButton>
	);
}
