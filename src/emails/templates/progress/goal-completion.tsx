import { Text } from "@react-email/components";
import {
	EmailLayout,
	EmailHeader,
	EmailFooter,
	Button,
	Card,
	Alert,
} from "../components";

interface GoalCompletionEmailProps {
	username: string;
	goalTitle: string;
	goalType:
		| "skill_development"
		| "project_completion"
		| "learning_path"
		| "career_milestone"
		| "habit_formation";
	completionDate: string;
	timeToComplete: string; // e.g., "3 weeks", "2 months"
	milestones: Array<{
		title: string;
		completedDate: string;
	}>;
	stats: {
		totalTasks?: number;
		completedTasks?: number;
		hoursSpent?: number;
		skillsLearned?: string[];
	};
	nextSuggestions: string[];
	dashboardUrl: string;
	newGoalUrl: string;
}

export const GoalCompletionEmail = ({
	username,
	goalTitle,
	goalType,
	completionDate,
	timeToComplete,
	milestones,
	stats,
	nextSuggestions,
	dashboardUrl,
	newGoalUrl,
}: GoalCompletionEmailProps) => {
	const goalTypeLabels = {
		skill_development: {
			label: "Skill Development",
			icon: "🚀",
			color: "#10b981",
		},
		project_completion: {
			label: "Project Completion",
			icon: "🏆",
			color: "#f59e0b",
		},
		learning_path: { label: "Learning Path", icon: "📚", color: "#8b5cf6" },
		career_milestone: {
			label: "Career Milestone",
			icon: "💼",
			color: "#ef4444",
		},
		habit_formation: { label: "Habit Formation", icon: "⭐", color: "#06b6d4" },
	};

	const goalInfo = goalTypeLabels[goalType];

	return (
		<EmailLayout preview={`Goal Achieved: ${goalTitle}`}>
			<EmailHeader />

			<div className="px-5 py-8">
				{/* Celebration Header */}
				<div className="text-center px-6 py-8 rounded-xl mb-8 bg-gradient-to-br from-emerald-500 to-emerald-600 dark:from-emerald-600 dark:to-emerald-700">
					<Text className="text-6xl mb-4 m-0">🏆</Text>
					<Text className="text-3xl md:text-4xl font-bold text-white dark:text-gray-100 mb-2 leading-tight">
						Goal Achieved!
					</Text>
					<Text className="text-base md:text-lg text-emerald-100 dark:text-emerald-200 m-0 leading-snug">
						You've successfully completed your goal, {username}
					</Text>
				</div>

				{/* Goal Details */}
				<Card>
					<div className="p-6">
						<div className="flex items-center mb-5 px-4 py-3 bg-gray-50 dark:bg-gray-800/30 rounded-lg border border-gray-200 dark:border-gray-700">
							<Text className="text-2xl mr-3 m-0">{goalInfo.icon}</Text>
							<Text className="flex-1">
								<Text className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 font-medium mb-1 block">
									{goalInfo.label}
								</Text>
								<Text className="text-lg md:text-xl font-bold text-gray-800 dark:text-gray-100 m-0">
									{goalTitle}
								</Text>
							</Text>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
							<Text className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
								<Text className="text-xs uppercase text-emerald-800 dark:text-emerald-300 font-semibold mb-1 block">
									Completed
								</Text>
								<Text className="text-lg md:text-xl font-bold text-gray-800 dark:text-gray-100 m-0">
									{new Date(completionDate).toLocaleDateString()}
								</Text>
							</Text>
							<Text className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
								<Text className="text-xs uppercase text-blue-800 dark:text-blue-300 font-semibold mb-1 block">
									Time Taken
								</Text>
								<Text className="text-lg md:text-xl font-bold text-gray-800 dark:text-gray-100 m-0">
									{timeToComplete}
								</Text>
							</Text>
						</div>

						{/* Goal Statistics */}
						{(stats.totalTasks ||
							stats.hoursSpent ||
							stats.skillsLearned?.length) && (
							<div className="p-5 bg-gray-50 dark:bg-gray-800/30 rounded-lg mb-6 border border-gray-200 dark:border-gray-700">
								<Text className="text-lg md:text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
									Goal Statistics
								</Text>

								<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
									{stats.totalTasks && (
										<Text className="text-center">
											<Text className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2 block">
												{stats.completedTasks || stats.totalTasks}/
												{stats.totalTasks}
											</Text>
											<Text className="text-xs text-gray-500 dark:text-gray-400 m-0">
												Tasks
											</Text>
										</Text>
									)}

									{stats.hoursSpent && (
										<Text className="text-center">
											<Text className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2 block">
												{stats.hoursSpent}
											</Text>
											<Text className="text-xs text-gray-500 dark:text-gray-400 m-0">
												Hours
											</Text>
										</Text>
									)}

									{stats.skillsLearned && stats.skillsLearned.length > 0 && (
										<Text className="text-center">
											<Text className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2 block">
												{stats.skillsLearned.length}
											</Text>
											<Text className="text-xs text-gray-500 dark:text-gray-400 m-0">
												Skills
											</Text>
										</Text>
									)}
								</div>

								{stats.skillsLearned && stats.skillsLearned.length > 0 && (
									<div className="mt-4">
										<Text className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
											Skills Learned:
										</Text>
										<Text className="text-xs text-gray-500 dark:text-gray-400 m-0">
											{stats.skillsLearned.join(", ")}
										</Text>
									</div>
								)}
							</div>
						)}

						{/* Milestones */}
						{milestones.length > 0 && (
							<div className="mb-6">
								<Text className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
									Milestones Achieved
								</Text>

								{milestones.map((milestone, index) => (
									<div
										key={milestone.title}
										className={`flex items-center py-3 ${
											index < milestones.length - 1
												? "border-b border-gray-200 dark:border-gray-700"
												: ""
										}`}
									>
										<div
											className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${
												goalType === "skill_development"
													? "bg-emerald-500"
													: goalType === "project_completion"
														? "bg-amber-500"
														: goalType === "learning_path"
															? "bg-violet-500"
															: goalType === "career_milestone"
																? "bg-red-500"
																: "bg-cyan-500"
											} dark:opacity-90`}
										>
											<Text className="text-white text-xs m-0">✓</Text>
										</div>
										<div className="flex-1">
											<Text className="text-sm md:text-base font-medium text-gray-900 dark:text-gray-100 mb-1">
												{milestone.title}
											</Text>
											<Text className="text-xs md:text-sm text-gray-600 dark:text-gray-400 m-0">
												{new Date(milestone.completedDate).toLocaleDateString()}
											</Text>
										</div>
									</div>
								))}
							</div>
						)}

						{/* Action Buttons */}
						<div className="text-center space-y-3 md:space-y-0 md:space-x-3 md:flex md:justify-center">
							<Button href={dashboardUrl} variant="primary" size="small">
								View Dashboard
							</Button>
							<Button href={newGoalUrl} variant="secondary" size="small">
								Set New Goal
							</Button>
						</div>
					</div>
				</Card>

				{/* Next Suggestions */}
				{nextSuggestions.length > 0 && (
					<Card className="mt-6">
						<div className="p-5">
							<Text className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
								What's Next? 🚀
							</Text>

							{nextSuggestions.map((suggestion) => (
								<Text
									key={`suggestion-${suggestion.substring(0, 20).replace(/\s+/g, "-").toLowerCase()}`}
									className="text-sm md:text-base text-gray-600 dark:text-gray-400 mb-3 pl-4 relative leading-relaxed block"
								>
									<span className="absolute left-0 text-emerald-500 dark:text-emerald-400">
										•
									</span>
									{suggestion}
								</Text>
							))}

							<div className="mt-4">
								<Button href={newGoalUrl} variant="secondary" size="small">
									Explore Goals
								</Button>
							</div>
						</div>
					</Card>
				)}
			</div>

			<EmailFooter />
		</EmailLayout>
	);
};
