import { Text, Link } from "@react-email/components";
import { EmailLayout, Button, Card } from "../components";

interface DailyReminderProps {
	username: string;
	streakCount: number;
	lastLogDate?: string;
	dashboardUrl: string;
}

/**
 * Daily reminder email to encourage consistent logging habits.
 */
export function DailyReminder({
	username,
	streakCount,
	lastLogDate,
	dashboardUrl,
}: DailyReminderProps) {
	const isStreakActive = streakCount > 0;

	return (
		<EmailLayout
			preview={`${isStreakActive ? `Keep your ${streakCount}-day streak going!` : "Time to log your progress!"}`}
			title="Daily Progress Reminder"
		>
			<Text className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
				{isStreakActive ? `🔥 ${streakCount}-Day Streak!` : "📝 Daily Check-in"}
			</Text>
			<Text className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-6">
				Hi {username},
			</Text>{" "}
			{isStreakActive ? (
				<div>
					<Text className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-6">
						Amazing work! You're on a {streakCount}-day logging streak. Don't
						break the momentum – log today's progress to keep it going!
					</Text>

					<Card className="mb-6 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-l-4 border-orange-500 dark:border-orange-400">
						<Text className="text-orange-800 dark:text-orange-200 text-base font-medium mb-2">
							🔥 Streak in Progress
						</Text>
						<Text className="text-orange-700 dark:text-orange-300 text-sm">
							You've been consistently logging for {streakCount} days. Each day
							builds momentum towards your development goals!
						</Text>
					</Card>
				</div>
			) : (
				<div>
					<Text className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-6">
						{lastLogDate
							? `Your last log was on ${lastLogDate}. Ready to get back into the rhythm?`
							: "Ready to start tracking your development journey?"}
					</Text>

					<Card className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-l-4 border-blue-500 dark:border-blue-400">
						<Text className="text-blue-800 dark:text-blue-200 text-base font-medium mb-2">
							📝 Start Your Journey
						</Text>
						<Text className="text-blue-700 dark:text-blue-300 text-sm">
							Consistent daily logging helps you track progress, identify
							patterns, and stay motivated on your development path.
						</Text>
					</Card>
				</div>
			)}{" "}
			<Text className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-6">
				Take a few minutes to reflect on today's coding activities:
			</Text>
			<div className="mb-8">
				<Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-2">
					💻 What did you work on today?
				</Text>
				<Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-2">
					📚 What did you learn?
				</Text>
				<Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-2">
					🏆 What challenges did you overcome?
				</Text>
				<Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-2">
					🎯 What's next on your roadmap?
				</Text>
			</div>
			<div className="text-center mb-8">
				<Button href={dashboardUrl} variant="primary">
					Log Today's Progress
				</Button>
			</div>{" "}
			<Text className="text-gray-500 dark:text-gray-400 text-sm text-center">
				Taking just 5 minutes to log your progress helps build lasting habits
				and provides valuable insights into your development journey.
			</Text>
		</EmailLayout>
	);
}
