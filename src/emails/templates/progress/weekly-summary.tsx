import { Text, Link, Hr } from "@react-email/components";
import { EmailLayout, Card, Button } from "../components";

interface WeeklySummaryProps {
	username: string;
	weekRange: string;
	stats: {
		logsCount: number;
		projectsWorkedOn: number;
		linesOfCode?: number;
		commits?: number;
		newSkills?: string[];
		topLanguages?: { name: string; percentage: number }[];
	};
	highlights: string[];
	dashboardUrl: string;
}

/**
 * Weekly summary email showing user's progress and achievements.
 */
export function WeeklySummary({
	username,
	weekRange,
	stats,
	highlights,
	dashboardUrl,
}: WeeklySummaryProps) {
	return (
		<EmailLayout
			preview={`Your week in review: ${stats.logsCount} logs, ${stats.projectsWorkedOn} projects`}
			title="Weekly Progress Summary"
		>
			{" "}
			<Text className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
				📊 Your Week in Review
			</Text>{" "}
			<Text className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-2">
				Hi {username},
			</Text>
			<Text className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-8">
				Here's a summary of your development progress for {weekRange}.
			</Text>{" "}
			{/* Stats Grid */}
			<div className="grid grid-cols-2 gap-4 mb-8">
				<Card className="text-center">
					<Text className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
						{stats.logsCount}
					</Text>
					<Text className="text-gray-600 dark:text-gray-400 text-sm">
						Daily Logs
					</Text>
				</Card>

				<Card className="text-center">
					<Text className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
						{stats.projectsWorkedOn}
					</Text>
					<Text className="text-gray-600 dark:text-gray-400 text-sm">
						Projects
					</Text>
				</Card>

				{stats.commits && (
					<Card className="text-center">
						<Text className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
							{stats.commits}
						</Text>
						<Text className="text-gray-600 dark:text-gray-400 text-sm">
							Commits
						</Text>
					</Card>
				)}

				{stats.linesOfCode && (
					<Card className="text-center">
						<Text className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
							{stats.linesOfCode.toLocaleString()}
						</Text>
						<Text className="text-gray-600 dark:text-gray-400 text-sm">
							Lines of Code
						</Text>
					</Card>
				)}
			</div>{" "}
			{/* Top Languages */}
			{stats.topLanguages && stats.topLanguages.length > 0 && (
				<Card className="mb-8">
					<Text className="text-gray-800 dark:text-gray-200 text-base font-medium mb-4">
						🔤 Top Languages This Week
					</Text>
					{stats.topLanguages.map((lang) => (
						<div
							key={lang.name}
							className="flex justify-between items-center mb-2"
						>
							<Text className="text-gray-600 dark:text-gray-400 text-sm">
								{lang.name}
							</Text>
							<Text className="text-gray-800 dark:text-gray-200 text-sm font-medium">
								{lang.percentage}%
							</Text>
						</div>
					))}
				</Card>
			)}{" "}
			{/* New Skills */}
			{stats.newSkills && stats.newSkills.length > 0 && (
				<Card className="mb-8">
					<Text className="text-gray-800 dark:text-gray-200 text-base font-medium mb-4">
						🆕 New Skills Learned
					</Text>
					<div className="flex flex-wrap gap-2">
						{stats.newSkills.map((skill) => (
							<span
								key={skill}
								className="bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 px-3 py-1 rounded-full text-sm"
							>
								{skill}
							</span>
						))}
					</div>
				</Card>
			)}{" "}
			{/* Highlights */}
			{highlights.length > 0 && (
				<div className="mb-8">
					<Text className="text-gray-800 dark:text-gray-200 text-base font-medium mb-4">
						✨ Week Highlights
					</Text>
					{highlights.map((highlight) => (
						<Card
							key={highlight}
							className="mb-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-l-4 border-green-500 dark:border-green-400"
						>
							<Text className="text-green-800 dark:text-green-200 text-sm">
								{highlight}
							</Text>
						</Card>
					))}
				</div>
			)}{" "}
			<Hr className="my-8 border-gray-200 dark:border-gray-700" />
			<Text className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-6">
				Keep up the great work! Consistent progress, no matter how small, leads
				to significant growth over time.
			</Text>
			<div className="text-center mb-6">
				<Button href={dashboardUrl} variant="primary">
					View Detailed Analytics
				</Button>
			</div>
			<Text className="text-gray-500 dark:text-gray-400 text-sm text-center">
				Want to adjust your weekly summary preferences?{" "}
				<Link
					href="https://tamatar.dev/settings/notifications"
					className="text-primary-600 dark:text-primary-400 underline hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
				>
					Update your settings
				</Link>
				.
			</Text>
		</EmailLayout>
	);
}
