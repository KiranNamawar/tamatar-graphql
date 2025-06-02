import { Text, Section, Img } from "@react-email/components";
import {
	EmailLayout,
	EmailHeader,
	EmailFooter,
	Button,
	Card,
	Alert,
} from "../components";

interface MentionEmailProps {
	userName: string;
	mentionerName: string;
	mentionerUsername: string;
	mentionerAvatar?: string;
	contentType: "comment" | "daily-log" | "project";
	contentTitle: string;
	contentId: string;
	contentUrl: string;
	mentionContext: string; // The text surrounding the mention
	projectName?: string; // If mention happened in a project context
	timestamp: string;
	viewAllUrl: string;
}

export const MentionEmail: React.FC<MentionEmailProps> = ({
	userName,
	mentionerName,
	mentionerUsername,
	mentionerAvatar,
	contentType,
	contentTitle,
	contentId,
	contentUrl,
	mentionContext,
	projectName,
	timestamp,
	viewAllUrl,
}) => {
	const truncateContext = (text: string, maxLength = 300) => {
		if (text.length <= maxLength) return text;
		return `${text.substring(0, maxLength)}...`;
	};

	const getContentTypeLabel = () => {
		switch (contentType) {
			case "comment":
				return "comment";
			case "daily-log":
				return "daily log";
			case "project":
				return "project update";
		}
	};

	return (
		<EmailLayout
			preview={`${mentionerName} mentioned you in a ${getContentTypeLabel()}`}
		>
			<EmailHeader />{" "}
			<Section className="py-8 px-5">
				{/* Header */}
				<Section className="mb-8">
					<Text className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 m-0 mb-2 leading-tight">
						You were mentioned!
					</Text>
					<Text className="text-base md:text-lg text-gray-700 dark:text-gray-300 m-0 leading-relaxed">
						{mentionerName} mentioned you in a {getContentTypeLabel()}
					</Text>
				</Section>

				{/* Mention Card */}
				<Card className="mb-6" padding="medium">
					<Section className="flex items-center mb-4">
						{/* Profile Image */}
						<div className="w-10 h-10 rounded-full overflow-hidden mr-3 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
							{mentionerAvatar ? (
								<Img
									src={mentionerAvatar}
									alt={`${mentionerName}'s profile`}
									width={40}
									height={40}
									className="object-cover"
								/>
							) : (
								<div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500">
									👤
								</div>
							)}
						</div>

						{/* User Info */}
						<div className="flex-1">
							<Text className="text-base font-semibold text-gray-800 dark:text-gray-100 m-0 mb-1">
								{mentionerName}
							</Text>
							<Text className="text-sm text-gray-600 dark:text-gray-400 m-0">
								@{mentionerUsername} • {timestamp}
							</Text>
						</div>
					</Section>

					{/* Content Info */}
					<Section className="mb-4">
						<Text className="text-sm text-gray-600 dark:text-gray-400 m-0 mb-1">
							{contentType === "project"
								? "Project update in"
								: contentType === "daily-log"
									? "Daily log for"
									: "Comment on"}
							:{" "}
							<span className="text-gray-800 dark:text-gray-100 font-semibold">
								{contentTitle}
							</span>
							{projectName && (
								<span>
									{" "}
									in project{" "}
									<span className="text-gray-800 dark:text-gray-100 font-semibold">
										{projectName}
									</span>
								</span>
							)}
						</Text>
					</Section>

					{/* Mention Context */}
					<Section className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border-l-3 border-emerald-500 dark:border-emerald-400 mb-4">
						<Text className="text-sm text-gray-700 dark:text-gray-300 m-0 leading-relaxed">
							{truncateContext(mentionContext)}
						</Text>
					</Section>

					{/* Action Button */}
					<Section className="text-center">
						<Button href={contentUrl} variant="primary" className="mr-3">
							View {getContentTypeLabel()}
						</Button>
					</Section>
				</Card>

				{/* Alert */}
				<Alert variant="success" className="mb-6">
					<strong>Tip:</strong> Mentions help spark discussion and encourage
					collaboration among developers. Reply to continue the conversation!
				</Alert>

				{/* More Context Card */}
				<Card className="mb-8" padding="medium">
					<Text className="text-base font-semibold text-gray-800 dark:text-gray-100 m-0 mb-3">
						Why am I receiving this?
					</Text>
					<Text className="text-sm text-gray-600 dark:text-gray-400 m-0 mb-4 leading-relaxed">
						You're receiving this email because {mentionerName} mentioned you
						using @{userName} in their {getContentTypeLabel()}.
					</Text>
					<Button href={viewAllUrl} variant="secondary">
						View All Mentions
					</Button>
				</Card>
			</Section>
			<EmailFooter />
		</EmailLayout>
	);
};

export default MentionEmail;
