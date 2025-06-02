import { EmailError, ErrorCode } from "@/lib/errors";
import { sendEmail } from "./send";

// Import email templates with correct named exports
import { AchievementEmail } from "./templates/progress/achievement";
import { DailyReminder } from "./templates/progress/daily-reminder";
import { GoalCompletionEmail } from "./templates/progress/goal-completion";
import { WeeklySummary } from "./templates/progress/weekly-summary";

// Export the return type for consistency across email services
export interface EmailServiceResponse {
	id: string;
	success: boolean;
}

/**
 * Email utility for progress-related emails
 * Uses progress-specific sender configuration for achievements, reminders, etc.
 */
const fromEmail = "progress@tamatar.dev";
const fromName = "Tamatar Progress";

export const ProgressEmailService = {
	/**
	 * Send achievement notification email
	 */
	async sendAchievementNotification(params: {
		to: string;
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
	}): Promise<EmailServiceResponse> {
		try {
			return await sendEmail({
				to: params.to,
				from: `${fromName} <${fromEmail}>`,
				subject: `🏆 Achievement Unlocked: ${params.achievementTitle}!`,
				react: AchievementEmail({
					username: params.username,
					achievementTitle: params.achievementTitle,
					achievementDescription: params.achievementDescription,
					achievementIcon: params.achievementIcon,
					achievementType: params.achievementType,
					level: params.level,
					milestone: params.milestone,
					rewardDescription: params.rewardDescription,
					nextGoal: params.nextGoal,
					dashboardUrl: params.dashboardUrl,
					shareUrl: params.shareUrl,
				}),
			});
		} catch (error) {
			throw new EmailError(
				`Failed to send achievement notification to ${params.to}`,
				ErrorCode.EMAIL_SEND_FAILED,
				{ recipient: params.to, emailType: "achievement" },
			);
		}
	},

	/**
	 * Send goal completion email
	 */
	async sendGoalCompletion(params: {
		to: string;
		username: string;
		goalTitle: string;
		goalType:
			| "skill_development"
			| "project_completion"
			| "learning_path"
			| "career_milestone"
			| "habit_formation";
		completionDate: string;
		timeToComplete: string;
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
	}): Promise<EmailServiceResponse> {
		try {
			return await sendEmail({
				to: params.to,
				from: `${fromName} <${fromEmail}>`,
				subject: `🎯 Goal Completed: ${params.goalTitle}!`,
				react: GoalCompletionEmail({
					username: params.username,
					goalTitle: params.goalTitle,
					goalType: params.goalType,
					completionDate: params.completionDate,
					timeToComplete: params.timeToComplete,
					milestones: params.milestones,
					stats: params.stats,
					nextSuggestions: params.nextSuggestions,
					dashboardUrl: params.dashboardUrl,
					newGoalUrl: params.newGoalUrl,
				}),
			});
		} catch (error) {
			throw new EmailError(
				`Failed to send goal completion email to ${params.to}`,
				ErrorCode.EMAIL_SEND_FAILED,
				{ recipient: params.to, emailType: "goal-completion" },
			);
		}
	},

	/**
	 * Send daily reminder email
	 */
	async sendDailyReminder(params: {
		to: string;
		username: string;
		streakCount: number;
		lastLogDate?: string;
		dashboardUrl: string;
	}): Promise<EmailServiceResponse> {
		try {
			return await sendEmail({
				to: params.to,
				from: `${fromName} <${fromEmail}>`,
				subject: "📝 Keep your progress streak going!",
				react: DailyReminder({
					username: params.username,
					streakCount: params.streakCount,
					lastLogDate: params.lastLogDate,
					dashboardUrl: params.dashboardUrl,
				}),
			});
		} catch (error) {
			throw new EmailError(
				`Failed to send daily reminder to ${params.to}`,
				ErrorCode.EMAIL_SEND_FAILED,
				{ recipient: params.to, emailType: "daily-reminder" },
			);
		}
	},

	/**
	 * Send weekly summary email
	 */
	async sendWeeklySummary(params: {
		to: string;
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
	}): Promise<EmailServiceResponse> {
		try {
			return await sendEmail({
				to: params.to,
				from: `${fromName} <${fromEmail}>`,
				subject: "📊 Your weekly progress summary",
				react: WeeklySummary({
					username: params.username,
					weekRange: params.weekRange,
					stats: params.stats,
					highlights: params.highlights,
					dashboardUrl: params.dashboardUrl,
				}),
			});
		} catch (error) {
			throw new EmailError(
				`Failed to send weekly summary to ${params.to}`,
				ErrorCode.EMAIL_SEND_FAILED,
				{ recipient: params.to, emailType: "weekly-summary" },
			);
		}
	},
};
