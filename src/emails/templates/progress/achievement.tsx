import { Text, Img } from "@react-email/components";
import {
	EmailLayout,
	EmailHeader,
	EmailFooter,
	Button,
	Card,
	Alert,
} from "../components";

interface AchievementEmailProps {
	username: string;
	achievementTitle: string;
	achievementDescription: string;
	achievementIcon: string;
	achievementType: "streak" | "skill" | "project" | "learning" | "community";
	level?: number;
	milestone?: number;
	rewardDescription?: string;
	nextGoal?: string;
	dashboardUrl: string;
	shareUrl: string;
}

export const AchievementEmail = ({
	username,
	achievementTitle,
	achievementDescription,
	achievementIcon,
	achievementType,
	level,
	milestone,
	rewardDescription,
	nextGoal,
	dashboardUrl,
	shareUrl,
}: AchievementEmailProps) => {
	const achievementColors = {
		streak: {
			bg: "#f0f9ff",
			border: "#0ea5e9",
			darkBg: "rgba(14, 165, 233, 0.1)",
		},
		skill: {
			bg: "#f0fdf4",
			border: "#10b981",
			darkBg: "rgba(16, 185, 129, 0.1)",
		},
		project: {
			bg: "#fef3f2",
			border: "#f97316",
			darkBg: "rgba(249, 115, 22, 0.1)",
		},
		learning: {
			bg: "#faf5ff",
			border: "#a855f7",
			darkBg: "rgba(168, 85, 247, 0.1)",
		},
		community: {
			bg: "#fff7ed",
			border: "#f59e0b",
			darkBg: "rgba(245, 158, 11, 0.1)",
		},
	};

	const colors = achievementColors[achievementType];

	return (
		<EmailLayout preview="Achievement Unlocked">
			<EmailHeader />
			<div className="px-5 py-8">
				{/* Celebration Banner */}
				<div
					className={`text-center p-6 rounded-xl mb-6 border-2 dark:border-opacity-30 ${
						achievementType === "streak"
							? "bg-sky-50 border-sky-500 dark:bg-sky-900/20"
							: achievementType === "skill"
								? "bg-emerald-50 border-emerald-500 dark:bg-emerald-900/20"
								: achievementType === "project"
									? "bg-orange-50 border-orange-500 dark:bg-orange-900/20"
									: achievementType === "learning"
										? "bg-purple-50 border-purple-500 dark:bg-purple-900/20"
										: "bg-amber-50 border-amber-500 dark:bg-amber-900/20"
					}`}
				>
					<div className="text-5xl mb-4">🎉</div>
					<Text className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-3 leading-tight m-0">
						Congratulations, {username}!
					</Text>
					<Text className="text-base md:text-lg text-gray-700 dark:text-gray-300 m-0 leading-snug">
						You've unlocked a new achievement
					</Text>
				</div>

				{/* Achievement Details */}
				<Card>
					<div className="text-center p-6">
						<div
							className={`w-20 h-20 rounded-full inline-flex items-center justify-center mb-4 border-4 dark:border-opacity-30 ${
								achievementType === "streak"
									? "bg-sky-50 border-sky-500 dark:bg-sky-900/20"
									: achievementType === "skill"
										? "bg-emerald-50 border-emerald-500 dark:bg-emerald-900/20"
										: achievementType === "project"
											? "bg-orange-50 border-orange-500 dark:bg-orange-900/20"
											: achievementType === "learning"
												? "bg-purple-50 border-purple-500 dark:bg-purple-900/20"
												: "bg-amber-50 border-amber-500 dark:bg-amber-900/20"
							}`}
						>
							<Text className="text-3xl m-0">{achievementIcon}</Text>
						</div>

						<Text className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2 m-0">
							{achievementTitle}
						</Text>

						<Text className="text-base md:text-lg text-gray-700 dark:text-gray-300 mb-4 leading-snug">
							{achievementDescription}
						</Text>

						{/* Level or Milestone Display */}
						{(level || milestone) && (
							<div className="bg-gray-50 dark:bg-gray-800 rounded-lg px-4 py-3 mb-4 inline-block">
								<Text className="text-sm font-semibold text-gray-700 dark:text-gray-300 m-0">
									{level && `Level ${level}`}
									{milestone && `${milestone} milestone reached`}
								</Text>
							</div>
						)}

						{/* Reward Description */}
						{rewardDescription && (
							<Alert variant="success" className="mb-5">
								<Text className="m-0 text-sm">
									<strong>Reward:</strong> {rewardDescription}
								</Text>
							</Alert>
						)}

						{/* Action Buttons */}
						<div className="text-center mt-6">
							<Button href={dashboardUrl} variant="primary" className="mr-3">
								View Dashboard
							</Button>
							<Button href={shareUrl} variant="secondary">
								Share Achievement
							</Button>
						</div>
					</div>
				</Card>

				{/* Next Goal */}
				{nextGoal && (
					<Card className="mt-6">
						<div className="p-5">
							<Text className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2 m-0">
								Keep the momentum going!
							</Text>
							<Text className="text-sm md:text-base text-gray-700 dark:text-gray-300 mb-4 leading-snug">
								Your next goal: {nextGoal}
							</Text>
							<Button href={dashboardUrl} variant="secondary" size="small">
								Set New Goals
							</Button>
						</div>
					</Card>
				)}

				{/* Motivational Quote */}
				<div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg mt-6">
					<Text className="text-base md:text-lg italic text-gray-700 dark:text-gray-300 m-0 leading-relaxed">
						"Success is the sum of small efforts repeated day in and day out."
					</Text>
					<Text className="text-sm text-gray-500 dark:text-gray-400 mt-2 mb-0">
						— Robert Collier
					</Text>
				</div>
			</div>

			<EmailFooter />
		</EmailLayout>
	);
};
