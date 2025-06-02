import { Text, Section, Img } from "@react-email/components";
import {
	EmailLayout,
	EmailHeader,
	EmailFooter,
	Button,
	Card,
} from "../components";

interface NewFollowerEmailProps {
	userName: string;
	followerName: string;
	followerUsername: string;
	followerAvatar?: string;
	followerBio?: string;
	followerStats: {
		projectsCount: number;
		followersCount: number;
		dailyLogsCount: number;
	};
	mutualFollowers: Array<{
		name: string;
		username: string;
		avatar?: string;
	}>;
	followerProfileUrl: string;
	followBackUrl: string;
	notificationSettingsUrl: string;
}

export const NewFollowerEmail: React.FC<NewFollowerEmailProps> = ({
	userName,
	followerName,
	followerUsername,
	followerAvatar,
	followerBio,
	followerStats,
	mutualFollowers,
	followerProfileUrl,
	followBackUrl,
	notificationSettingsUrl,
}) => {
	return (
		<EmailLayout
			preview={`New follower: ${followerName} (@${followerUsername}) started following you on Tamatar`}
		>
			<EmailHeader />
			<Section className="py-8 px-5">
				{" "}
				{/* Header */}
				<Section className="text-center mb-8">
					<div className="text-3xl mb-4">👋</div>
					<Text className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 m-0 mb-2 leading-tight">
						You have a new follower!
					</Text>
					<Text className="text-base md:text-lg text-gray-700 dark:text-gray-300 m-0 leading-relaxed">
						{followerName} started following you on Tamatar
					</Text>
				</Section>
				{/* Follower Profile Card */}
				<Card>
					<Section className="p-6">
						{" "}
						{/* Profile Header */}
						<Section className="flex items-center mb-5">
							<div className="w-15 h-15 rounded-full bg-gray-100 dark:bg-gray-700 mr-4 overflow-hidden flex items-center justify-center">
								{followerAvatar ? (
									<Img
										src={followerAvatar}
										alt={`${followerName}'s avatar`}
										width={60}
										height={60}
										className="rounded-full"
									/>
								) : (
									<Text className="text-2xl text-gray-400 dark:text-gray-500 m-0">
										👤
									</Text>
								)}
							</div>

							<div className="flex-1">
								<Text className="text-lg md:text-xl font-bold text-gray-800 dark:text-gray-100 m-0 mb-1">
									{followerName}
								</Text>
								<Text className="text-sm md:text-base text-gray-600 dark:text-gray-400 m-0">
									@{followerUsername}
								</Text>
							</div>
						</Section>{" "}
						{/* Bio */}
						{followerBio && (
							<Section className="mb-5">
								<Text className="text-sm md:text-base text-gray-700 dark:text-gray-300 m-0 leading-relaxed italic">
									"{followerBio}"
								</Text>
							</Section>
						)}{" "}
						{/* Stats */}
						<Section className="grid grid-cols-3 gap-4 mb-5 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
							<div className="text-center">
								<Text className="text-xl md:text-2xl font-bold text-emerald-600 dark:text-emerald-400 m-0 mb-1">
									{followerStats.projectsCount}
								</Text>
								<Text className="text-xs md:text-sm text-gray-600 dark:text-gray-400 m-0">
									Projects
								</Text>
							</div>

							<div className="text-center">
								<Text className="text-xl md:text-2xl font-bold text-emerald-600 dark:text-emerald-400 m-0 mb-1">
									{followerStats.followersCount}
								</Text>
								<Text className="text-xs md:text-sm text-gray-600 dark:text-gray-400 m-0">
									Followers
								</Text>
							</div>

							<div className="text-center">
								<Text className="text-xl md:text-2xl font-bold text-emerald-600 dark:text-emerald-400 m-0 mb-1">
									{followerStats.dailyLogsCount}
								</Text>
								<Text className="text-xs md:text-sm text-gray-600 dark:text-gray-400 m-0">
									Daily Logs
								</Text>
							</div>
						</Section>
						{/* Action Buttons */}
						<Section className="text-center">
							<Button
								href={followerProfileUrl}
								variant="primary"
								className="mr-3"
							>
								View Profile
							</Button>
							<Button href={followBackUrl} variant="secondary">
								Follow Back
							</Button>
						</Section>
					</Section>
				</Card>{" "}
				{/* Mutual Followers */}
				{mutualFollowers.length > 0 && (
					<Card className="mt-6">
						<Section className="p-5">
							<Text className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-100 m-0 mb-4">
								Mutual Connections ({mutualFollowers.length})
							</Text>{" "}
							<Section className="flex flex-wrap gap-3">
								{mutualFollowers.slice(0, 6).map((mutual) => (
									<div
										key={mutual.username}
										className="flex items-center py-2 px-3 bg-gray-100 dark:bg-gray-700 rounded-full text-xs"
									>
										<div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-600 mr-2 overflow-hidden flex items-center justify-center">
											{mutual.avatar ? (
												<Img
													src={mutual.avatar}
													alt={`${mutual.name}'s avatar`}
													width={24}
													height={24}
													className="rounded-full"
												/>
											) : (
												<Text className="text-xs text-gray-400 dark:text-gray-500 m-0">
													👤
												</Text>
											)}
										</div>
										<Text className="text-xs md:text-sm text-gray-700 dark:text-gray-300 m-0">
											{mutual.name}
										</Text>
									</div>
								))}

								{mutualFollowers.length > 6 && (
									<div className="flex items-center py-2 px-3 bg-gray-100 dark:bg-gray-700 rounded-full">
										<Text className="text-xs md:text-sm text-gray-600 dark:text-gray-400 m-0">
											+{mutualFollowers.length - 6} more
										</Text>
									</div>
								)}
							</Section>
						</Section>
					</Card>
				)}{" "}
				{/* Footer Message */}
				<Section className="text-center p-5 bg-gray-50 dark:bg-gray-800 rounded-lg mt-6">
					<Text className="text-sm md:text-base text-gray-700 dark:text-gray-300 m-0 mb-3 leading-relaxed">
						Building connections in the developer community helps everyone grow.
						Consider following back to strengthen your network!
					</Text>

					<Button
						href={notificationSettingsUrl}
						variant="secondary"
						size="small"
					>
						Manage Notifications
					</Button>
				</Section>
			</Section>
			<EmailFooter />
		</EmailLayout>
	);
};

export default NewFollowerEmail;
