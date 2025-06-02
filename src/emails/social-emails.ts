import { EmailError, ErrorCode } from "../lib/errors";
import { sendEmail } from "./send";

// Import email templates with named exports
import { CommentNotificationEmail } from "./templates/social/comment-notification";
import { CommunityDigestEmail } from "./templates/social/community-digest";
import { MentionEmail } from "./templates/social/mention";
import { NewFollowerEmail } from "./templates/social/new-follower";

/**
 * Email utility for social interaction emails
 * Uses social-specific sender configuration for community interactions
 */
const fromEmail = "social@tamatar.dev";
const fromName = "Tamatar Community";

export const SocialEmailService = {
	/**
	 * Send new follower notification email
	 */
	async sendNewFollowerNotification(params: {
		to: string;
		username: string;
		followerUsername: string;
		followerDisplayName?: string;
		followerAvatarUrl?: string;
		followerBio?: string;
		followerProfileUrl: string;
		mutualFollowers?: number;
		followedAt: Date;
	}): Promise<{ id: string; success: boolean }> {
		try {
			return await sendEmail({
				to: params.to,
				from: `${fromName} <${fromEmail}>`,
				subject: `👋 ${params.followerDisplayName || params.followerUsername} is now following you!`,
				react: await NewFollowerEmail({
					userName: params.username,
					followerName: params.followerDisplayName || params.followerUsername,
					followerUsername: params.followerUsername,
					followerAvatar: params.followerAvatarUrl,
					followerBio: params.followerBio,
					followerProfileUrl: params.followerProfileUrl,
					mutualFollowers: [],
					followerStats: {
						projectsCount: 0,
						followersCount: 0,
						dailyLogsCount: 0,
					},
					followBackUrl: params.followerProfileUrl,
					notificationSettingsUrl: "",
				}),
			});
		} catch (error) {
			throw new EmailError(
				`Failed to send new follower notification to ${params.to}`,
				ErrorCode.EMAIL_SEND_FAILED,
				{ recipient: params.to, emailType: "new-follower" },
			);
		}
	},

	/**
	 * Send mention notification email
	 */
	async sendMentionNotification(params: {
		to: string;
		username: string;
		mentionedBy: string;
		mentionedByDisplayName?: string;
		mentionedByAvatarUrl?: string;
		mentionContext: "comment" | "log" | "project" | "resource";
		contentTitle: string;
		contentExcerpt: string;
		contentUrl: string;
		mentionedAt: Date;
	}): Promise<{ id: string; success: boolean }> {
		try {
			const contextMap = {
				comment: "commented and mentioned you",
				log: "mentioned you in a daily log",
				project: "mentioned you in a project",
				resource: "mentioned you about a resource",
			};

			return await sendEmail({
				to: params.to,
				from: `${fromName} <${fromEmail}>`,
				subject: `@${params.mentionedBy} ${contextMap[params.mentionContext]}`,
				react: await MentionEmail({
					userName: params.username,
					mentionerName: params.mentionedByDisplayName || params.mentionedBy,
					mentionerUsername: params.mentionedBy,
					mentionerAvatar: params.mentionedByAvatarUrl,
					contentType:
						params.mentionContext === "log"
							? "daily-log"
							: params.mentionContext === "resource"
								? "project"
								: params.mentionContext,
					contentTitle: params.contentTitle,
					contentId: "content-id",
					contentUrl: params.contentUrl,
					mentionContext: params.contentExcerpt,
					projectName: undefined,
					timestamp: params.mentionedAt.toISOString(),
					viewAllUrl: params.contentUrl,
				}),
			});
		} catch (error) {
			throw new EmailError(
				`Failed to send mention notification to ${params.to}`,
				ErrorCode.EMAIL_SEND_FAILED,
				{ recipient: params.to, emailType: "mention" },
			);
		}
	},

	/**
	 * Send comment notification email
	 */
	async sendCommentNotification(params: {
		to: string;
		username: string;
		commenterUsername: string;
		commenterDisplayName?: string;
		commenterAvatarUrl?: string;
		commentContent: string;
		contentType: "log" | "project" | "resource";
		contentTitle: string;
		contentUrl: string;
		commentedAt: Date;
		replyUrl?: string;
	}): Promise<{ id: string; success: boolean }> {
		try {
			return await sendEmail({
				to: params.to,
				from: `${fromName} <${fromEmail}>`,
				subject: `💬 ${params.commenterDisplayName || params.commenterUsername} commented on your ${params.contentType}`,
				react: await CommentNotificationEmail({
					userName: params.username,
					commenterName:
						params.commenterDisplayName || params.commenterUsername,
					commenterUsername: params.commenterUsername,
					commenterAvatar: params.commenterAvatarUrl,
					contentType:
						params.contentType === "log" ? "daily-log" : params.contentType,
					contentTitle: params.contentTitle,
					contentId: "content-id",
					contentUrl: params.contentUrl,
					commentText: params.commentContent,
					timestamp: params.commentedAt.toISOString(),
					notificationSettingsUrl: params.replyUrl || "",
				}),
			});
		} catch (error) {
			throw new EmailError(
				`Failed to send comment notification to ${params.to}`,
				ErrorCode.EMAIL_SEND_FAILED,
				{ recipient: params.to, emailType: "comment-notification" },
			);
		}
	},

	/**
	 * Send community digest email
	 */
	async sendCommunityDigest(params: {
		to: string;
		username: string;
		digestType: "weekly" | "monthly";
		periodStart: Date;
		periodEnd: Date;
		highlights: Array<{
			type: "achievement" | "project" | "resource" | "discussion";
			title: string;
			description: string;
			author: string;
			url: string;
			engagement?: number;
		}>;
		trendingTopics?: string[];
		newMembers?: number;
		totalActivity?: number;
		personalizedSuggestions?: Array<{
			title: string;
			reason: string;
			url: string;
		}>;
	}): Promise<{ id: string; success: boolean }> {
		try {
			const digestTitle =
				params.digestType === "weekly" ? "This week" : "This month";

			return await sendEmail({
				to: params.to,
				from: `${fromName} <${fromEmail}>`,
				subject: `🌟 Community Digest: ${digestTitle} in the Tamatar community`,
				react: await CommunityDigestEmail({
					recipientName: params.username,
					weekOf:
						params.digestType === "weekly"
							? `${params.periodStart.toLocaleDateString()} - ${params.periodEnd.toLocaleDateString()}`
							: params.periodStart.toLocaleDateString(),
					highlights: {
						topContributor: {
							name: "Top Contributor",
							username: "top_user",
							contributions: 15,
							streak: 7,
						},
						trendingProjects: params.highlights
							.filter((h) => h.type === "project")
							.slice(0, 3)
							.map((h) => ({
								id: "project-id",
								name: h.title,
								author: h.author,
								description: h.description,
								techStack: ["React", "TypeScript"],
								stars: h.engagement || 0,
								url: h.url,
							})),
						popularResources: params.highlights
							.filter((h) => h.type === "resource")
							.slice(0, 3)
							.map((h) => ({
								id: "resource-id",
								title: h.title,
								url: h.url,
								type: "ARTICLE",
								rating: 4.5,
								bookmarks: h.engagement || 0,
								author: h.author,
							})),
						discussions: params.highlights
							.filter((h) => h.type === "discussion")
							.slice(0, 3)
							.map((h) => ({
								id: "discussion-id",
								title: h.title,
								author: h.author,
								replies: h.engagement || 0,
								topic: "General",
								url: h.url,
							})),
					},
					communityStats: {
						totalMembers: 1000,
						newMembers: params.newMembers || 0,
						totalProjects: 50,
						newProjects: 0,
						totalLogs: params.totalActivity || 0,
						newLogs: 0,
						activeStreaks: 0,
					},
					unsubscribeUrl: "/unsubscribe",
				}),
			});
		} catch (error) {
			throw new EmailError(
				`Failed to send community digest to ${params.to}`,
				ErrorCode.EMAIL_SEND_FAILED,
				{ recipient: params.to, emailType: "community-digest" },
			);
		}
	},
};
