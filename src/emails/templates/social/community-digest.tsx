import { Text, Section, Img } from "@react-email/components";
import {
	EmailLayout,
	EmailHeader,
	EmailFooter,
	Button,
	Card,
	Alert,
} from "../components";

interface CommunityDigestEmailProps {
	recipientName: string;
	weekOf: string;
	highlights: {
		topContributor: {
			name: string;
			username: string;
			avatar?: string;
			contributions: number;
			streak: number;
		};
		trendingProjects: Array<{
			id: string;
			name: string;
			author: string;
			description: string;
			techStack: string[];
			stars: number;
			url: string;
		}>;
		popularResources: Array<{
			id: string;
			title: string;
			url: string;
			type: string;
			rating: number;
			bookmarks: number;
			author: string;
		}>;
		discussions: Array<{
			id: string;
			title: string;
			author: string;
			replies: number;
			topic: string;
			url: string;
		}>;
	};
	communityStats: {
		totalMembers: number;
		newMembers: number;
		totalProjects: number;
		newProjects: number;
		totalLogs: number;
		newLogs: number;
		activeStreaks: number;
	};
	personalStats?: {
		weeklyLogs: number;
		streakDays: number;
		projectsWorkedOn: number;
		communityInteractions: number;
	};
	upcomingEvents?: Array<{
		title: string;
		date: string;
		type: "workshop" | "meetup" | "challenge" | "ama";
		url: string;
	}>;
	unsubscribeUrl: string;
}



export const CommunityDigestEmail: React.FC<CommunityDigestEmailProps> = ({
	recipientName,
	weekOf,
	highlights,
	communityStats,
	personalStats,
	upcomingEvents,
	unsubscribeUrl,
}) => {
	const formatNumber = (num: number) => {
		if (num >= 1000) {
			return `${(num / 1000).toFixed(1)}k`;
		}
		return num.toString();
	};

	const getEventIcon = (type: string) => {
		switch (type) {
			case "workshop":
				return "🛠️";
			case "meetup":
				return "👥";
			case "challenge":
				return "🏆";
			case "ama":
				return "💬";
			default:
				return "📅";
		}
	};

	const getStars = (rating: number) => {
		return "⭐".repeat(Math.floor(rating));
	};
	return (
			<EmailLayout preview={`Weekly Community Digest - Week of ${weekOf}`}>
				<EmailHeader />

				<Section className="py-8 px-5">
					{/* Header */}
					<Section className="mb-8 text-center">
						<Text className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2 leading-tight">
							📊 Weekly Community Digest
						</Text>
						<Text className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-1">
							Hi {recipientName}! Here's what happened in the Tamatar community
						</Text>
						<Text className="text-sm md:text-base text-gray-400 dark:text-gray-500">Week of {weekOf}</Text>
					</Section>

					{/* Personal Stats (if available) */}
					{personalStats && (
						<Card className="mb-8" padding="medium">
							<Section className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 p-6 rounded-lg">
								<Text className="text-lg md:text-xl font-semibold text-yellow-800 dark:text-yellow-200 mb-4 flex items-center">
									🎯 Your Week at a Glance
								</Text>
								<Section className="grid grid-cols-2 md:grid-cols-4 gap-4">
									<Section className="text-center">
										<Text className="text-xl md:text-2xl font-bold text-yellow-800 dark:text-yellow-200 mb-1">
											{personalStats.weeklyLogs}
										</Text>
										<Text className="text-xs text-yellow-800 dark:text-yellow-300 font-medium">
											Daily Logs
										</Text>
									</Section>
									<Section className="text-center">
										<Text className="text-xl md:text-2xl font-bold text-yellow-800 dark:text-yellow-200 mb-1">
											{personalStats.streakDays}
										</Text>
										<Text className="text-xs text-yellow-800 dark:text-yellow-300 font-medium">
											Day Streak
										</Text>
									</Section>
									<Section className="text-center">
										<Text className="text-xl md:text-2xl font-bold text-yellow-800 dark:text-yellow-200 mb-1">
											{personalStats.projectsWorkedOn}
										</Text>
										<Text className="text-xs text-yellow-800 dark:text-yellow-300 font-medium">
											Projects
										</Text>
									</Section>
									<Section className="text-center">
										<Text className="text-xl md:text-2xl font-bold text-yellow-800 dark:text-yellow-200 mb-1">
											{personalStats.communityInteractions}
										</Text>
										<Text className="text-xs text-yellow-800 dark:text-yellow-300 font-medium">
											Interactions
										</Text>
									</Section>
								</Section>
							</Section>
						</Card>
					)}

					{/* Community Stats */}
					<Card className="mb-8" padding="medium">
						<Text className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
							🌟 Community Growth
						</Text>
						<Section className="grid grid-cols-2 md:grid-cols-4 gap-4">
							<Section className="text-center">
								<Text className="text-xl md:text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">
									{formatNumber(communityStats.totalMembers)}
								</Text>
								<Text className="text-xs text-gray-600 dark:text-gray-400 font-medium">
									Total Members
								</Text>
								<Text className="text-xs text-emerald-600 dark:text-emerald-400">
									+{communityStats.newMembers} this week
								</Text>
							</Section>
							<Section className="text-center">
								<Text className="text-xl md:text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">
									{formatNumber(communityStats.totalProjects)}
								</Text>
								<Text className="text-xs text-gray-600 dark:text-gray-400 font-medium">
									Total Projects
								</Text>
								<Text className="text-xs text-emerald-600 dark:text-emerald-400">
									+{communityStats.newProjects} this week
								</Text>							</Section>							<Section className="text-center">
								<Text className="text-xl md:text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">
									{formatNumber(communityStats.totalLogs)}
								</Text>
								<Text className="text-xs text-gray-600 dark:text-gray-400 font-medium">
									Daily Logs
								</Text>
								<Text className="text-xs text-emerald-600 dark:text-emerald-400">
									+{communityStats.newLogs} this week
								</Text>
							</Section>
							<Section className="text-center">
								<Text className="text-xl md:text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">
									{formatNumber(communityStats.activeStreaks)}
								</Text>
								<Text className="text-xs text-gray-600 dark:text-gray-400 font-medium">
									Active Streaks
								</Text>
							</Section>
						</Section>
					</Card>

					{/* Top Contributor */}
					<Card className="mb-8" padding="medium">
						<Text className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
							🏆 Top Contributor of the Week
						</Text>
						<Section className="flex items-center">
							<Section className="w-16 h-16 rounded-full bg-emerald-600 dark:bg-emerald-700 flex items-center justify-center mr-4 overflow-hidden">
								{highlights.topContributor.avatar ? (
									<Img
										src={highlights.topContributor.avatar}
										alt={`${highlights.topContributor.name}'s avatar`}
										className="w-full h-full object-cover"
									/>
								) : (
									<Text className="text-white text-2xl font-semibold">
										{highlights.topContributor.name.charAt(0).toUpperCase()}
									</Text>
								)}
							</Section>
							<Section className="flex-1">
								<Text className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
									{highlights.topContributor.name}
								</Text>
								<Text className="text-sm text-gray-600 dark:text-gray-400 mb-2">
									@{highlights.topContributor.username}
								</Text>
								<Section className="flex gap-4">
									<Text className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
										{highlights.topContributor.contributions} contributions
									</Text>
									<Text className="text-xs text-amber-600 dark:text-amber-400 font-medium">
										🔥 {highlights.topContributor.streak} day streak
									</Text>
								</Section>
							</Section>
						</Section>
					</Card>					{/* Trending Projects */}
					{highlights.trendingProjects.length > 0 && (
						<Card className="mb-8" padding="medium">
							<Text className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
								🚀 Trending Projects
							</Text>
							{highlights.trendingProjects.slice(0, 3).map((project, index) => (
								<Section
									key={project.id}
									className={`${
										index < highlights.trendingProjects.slice(0, 3).length - 1
											? "border-b border-gray-200 dark:border-gray-700 pb-4 mb-4"
											: ""
									}`}
								>
									<Section className="flex justify-between items-start">
										<Section className="flex-1">
											<Text className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
												{project.name}
											</Text>
											<Text className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mb-2">
												by {project.author}
											</Text>
											<Text className="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-2 leading-relaxed">
												{project.description}
											</Text>
											<Section className="flex gap-1.5 flex-wrap">
												{project.techStack.slice(0, 3).map((tech) => (
													<Text
														key={tech}
														className="text-xs bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 px-1.5 py-0.5 rounded font-medium"
													>
														{tech}
													</Text>
												))}
												{project.techStack.length > 3 && (
													<Text className="text-xs text-gray-600 dark:text-gray-400">
														+{project.techStack.length - 3} more
													</Text>
												)}
											</Section>
										</Section>
										<Section className="ml-4 text-right">
											<Text className="text-sm font-semibold text-amber-600 dark:text-amber-400 mb-1">
												⭐ {project.stars}
											</Text>
											<Text className="text-emerald-600 dark:text-emerald-400 text-xs font-medium hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors">
												<a
													href={project.url}
													className="text-emerald-600 dark:text-emerald-400 no-underline hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
												>
													View Project →
												</a>
											</Text>
										</Section>
									</Section>
								</Section>
							))}
						</Card>
					)}					{/* Popular Resources */}
					{highlights.popularResources.length > 0 && (
						<Card className="mb-8" padding="medium">
							<Text className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
								📚 Popular Resources
							</Text>
							{highlights.popularResources
								.slice(0, 3)
								.map((resource, index) => (
									<Section
										key={resource.id}
										className={`flex justify-between items-center ${
											index < highlights.popularResources.slice(0, 3).length - 1
												? "border-b border-gray-200 dark:border-gray-700 pb-3 mb-3"
												: ""
										}`}
									>
										<Section className="flex-1">
											<Text className="text-sm md:text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">
												{resource.title}
											</Text>
											<Section className="flex items-center gap-2">
												<Text className="text-xs bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 px-1.5 py-0.5 rounded font-medium">
													{resource.type}
												</Text>
												<Text className="text-xs text-amber-600 dark:text-amber-400">
													{getStars(resource.rating)}
												</Text>
												<Text className="text-xs text-gray-600 dark:text-gray-400">
													{resource.bookmarks} bookmarks
												</Text>
											</Section>
										</Section>
										<Text className="text-emerald-600 dark:text-emerald-400 text-xs font-medium hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors">
											<a
												href={resource.url}
												className="text-emerald-600 dark:text-emerald-400 no-underline hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
											>
												View →
											</a>
										</Text>
									</Section>
								))}
						</Card>
					)}					{/* Upcoming Events */}
					{upcomingEvents && upcomingEvents.length > 0 && (
						<Card className="mb-8" padding="medium">
							<Text className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
								📅 Upcoming Events
							</Text>
							{upcomingEvents.map((event, index) => (
								<Section
									key={event.title + event.date}
									className={`flex items-center ${
										index < upcomingEvents.length - 1 ? "mb-3" : ""
									}`}
								>
									<Text className="text-xl mr-3">
										{getEventIcon(event.type)}
									</Text>
									<Section className="flex-1">
										<Text className="text-sm md:text-base font-semibold text-gray-900 dark:text-gray-100 mb-0.5">
											{event.title}
										</Text>
										<Text className="text-xs md:text-sm text-gray-600 dark:text-gray-400">{event.date}</Text>
									</Section>
									<Text className="text-emerald-600 dark:text-emerald-400 text-xs font-medium hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors">
										<a
											href={event.url}
											className="text-emerald-600 dark:text-emerald-400 no-underline hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
										>
											Join →
										</a>
									</Text>
								</Section>
							))}
						</Card>
					)}

					{/* Call to Action */}
					<div className="text-center mb-8">
						<Button
							href="https://tamatar.dev/community"
							variant="primary"
							className="mr-3"
						>
							Explore Community
						</Button>
						<Button href="https://tamatar.dev/dashboard" variant="secondary">
							Log Your Progress
						</Button>
					</div>

					{/* Engagement Tip */}
					<Alert variant="info" className="mb-6">
						<strong>💡 Community Tip:</strong> The most successful developers on
						Tamatar actively engage with others' projects and share helpful
						resources. Consider commenting on a project that interests you or
						sharing a resource you've found valuable!
					</Alert>

					{/* Footer */}
					<div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
						<p className="text-sm text-gray-600 mb-2">
							Want to adjust how often you receive community updates?
						</p>
						<a
							href={unsubscribeUrl}
							className="text-emerald-600 no-underline text-sm font-medium hover:text-emerald-700"
						>
							Manage notification preferences
						</a>
					</div>
					</Section>
				<EmailFooter />
			</EmailLayout>
	);
};

export default CommunityDigestEmail;
