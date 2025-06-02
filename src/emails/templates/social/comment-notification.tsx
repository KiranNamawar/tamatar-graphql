import { Text, Img } from "@react-email/components";
import {
	EmailLayout,
	EmailHeader,
	EmailFooter,
	Button,
	Card,
	Alert,
} from "../components";

interface CommentNotificationEmailProps {
	userName: string;
	commenterName: string;
	commenterUsername: string;
	commenterAvatar?: string;
	contentType: "daily-log" | "project" | "resource";
	contentTitle: string;
	contentId: string;
	contentUrl: string;
	commentText: string;
	timestamp: string;
	notificationSettingsUrl: string;
}

export const CommentNotificationEmail: React.FC<
	CommentNotificationEmailProps
> = ({
	userName,
	commenterName,
	commenterUsername,
	commenterAvatar,
	contentType,
	contentTitle,
	contentId,
	contentUrl,
	commentText,
	timestamp,
	notificationSettingsUrl,
}) => {
	const truncateComment = (text: string, maxLength = 200) => {
		if (text.length <= maxLength) return text;
		return `${text.substring(0, maxLength)}...`;
	};

	const getContentTypeLabel = () => {
		switch (contentType) {
			case "daily-log":
				return "daily log";
			case "project":
				return "project";
			case "resource":
				return "resource";
		}
	};

	return (
		<EmailLayout
			preview={`${commenterName} commented on your ${getContentTypeLabel()}: ${contentTitle}`}
		>
			<EmailHeader />

			<div className="py-8 px-5">
				{/* Header */}
				<div className="mb-8">
					<Text className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 m-0 mb-2 leading-tight">
						New Comment on Your {getContentTypeLabel()}
					</Text>
					<Text className="text-base md:text-lg text-gray-700 dark:text-gray-300 m-0 leading-relaxed">
						{commenterName} left a comment on your {getContentTypeLabel()}:{" "}
						<span className="font-medium text-gray-800 dark:text-gray-200">
							{contentTitle}
						</span>
					</Text>
				</div>

				{/* Comment Card */}
				<Card className="mb-6" padding="medium">
					<div className="flex items-center mb-4">
						{/* Profile Image */}
						<div className="w-10 h-10 rounded-full overflow-hidden mr-3 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
							{commenterAvatar ? (
								<Img
									src={commenterAvatar}
									alt={`${commenterName}'s profile`}
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
							<Text className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-100 m-0 mb-1">
								{commenterName}
							</Text>
							<Text className="text-sm md:text-base text-gray-600 dark:text-gray-400 m-0">
								@{commenterUsername} • {timestamp}
							</Text>
						</div>
					</div>

					{/* Comment Content */}
					<div className="p-4 bg-gray-50 dark:bg-gray-800/30 rounded-lg border-l-4 border-emerald-500 dark:border-emerald-400 mb-4">
						<Text className="text-sm md:text-base text-gray-700 dark:text-gray-300 m-0 leading-relaxed">
							{truncateComment(commentText)}
						</Text>
					</div>

					{/* Action Button */}
					<div className="text-center">
						<Button href={contentUrl} variant="primary" className="mr-3">
							View Comment & Reply
						</Button>
					</div>
				</Card>

				{/* Alert */}
				<Alert variant="info" className="mb-6">
					<strong>Why reply?</strong> Engaging with comments helps build a
					stronger developer community and improves your projects through
					valuable feedback.
				</Alert>

				{/* Context Card */}
				<Card className="mb-8" padding="medium">
					<Text className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-100 m-0 mb-3">
						About Your {getContentTypeLabel()}
					</Text>
					<Text className="text-sm md:text-base text-gray-700 dark:text-gray-300 m-0 mb-4 leading-relaxed">
						This comment was posted on your {getContentTypeLabel()}{" "}
						<span className="font-medium text-gray-800 dark:text-gray-200">
							{contentTitle}
						</span>
						. You'll be notified of future comments on this{" "}
						{getContentTypeLabel()}.
					</Text>
					<Button href={notificationSettingsUrl} variant="secondary">
						Manage Notifications
					</Button>
				</Card>
			</div>

			<EmailFooter />
		</EmailLayout>
	);
};

export default CommentNotificationEmail;
