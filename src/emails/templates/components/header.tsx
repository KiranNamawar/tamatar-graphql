import { Img, Section, Text } from "@react-email/components";

/**
 * Email header component with Tamatar logo and branding.
 * Provides consistent header across all email templates.
 */
export function EmailHeader() {
	return (
		<Section className="bg-white px-6 py-6 border-b border-gray-200">
			<div className="flex items-center">
				{/* Logo placeholder - replace with actual Tamatar logo */}
				<div className="flex items-center space-x-3">
					<div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
						<Text className="text-white font-bold text-lg m-0">T</Text>
					</div>
					<div>
						<Text className="text-gray-900 font-bold text-xl m-0">Tamatar</Text>
						<Text className="text-gray-500 text-sm m-0">
							Developer Progress Tracker
						</Text>
					</div>
				</div>
			</div>
		</Section>
	);
}
