/**
 * Email Services - Centralized exports for all email utilities
 *
 * This module provides easy access to all email services with their
 * specialized sender configurations and template handling.
 */

// Core email sending function
export { sendEmail } from "./send";

// Specialized email service classes
export { AuthEmailService } from "./auth-emails";
export { PlatformEmailService } from "./platform-emails";
export { ProgressEmailService } from "./progress-emails";
export { SocialEmailService } from "./social-emails";

// Re-export common types for convenience
export interface EmailServiceResponse {
	id: string;
	success: boolean;
}

/**
 * Email service usage examples:
 *
 * @example Authentication emails
 * ```typescript
 * import { AuthEmailService } from '@/emails';
 *
 * await AuthEmailService.sendWelcomeEmail({
 *   to: 'user@example.com',
 *   userName: 'John Doe',
 *   verificationLink: 'https://tamatar.dev/verify/token'
 * });
 * ```
 *
 * @example Platform notifications
 * ```typescript
 * import { PlatformEmailService } from '@/emails';
 *
 * await PlatformEmailService.sendFeatureAnnouncement({
 *   to: 'user@example.com',
 *   userName: 'John Doe',
 *   featureName: 'New Dashboard',
 *   description: 'Redesigned user dashboard with improved analytics'
 * });
 * ```
 *
 * @example Progress tracking
 * ```typescript
 * import { ProgressEmailService } from '@/emails';
 *
 * await ProgressEmailService.sendAchievementNotification({
 *   to: 'user@example.com',
 *   userName: 'John Doe',
 *   achievementName: '30-Day Streak',
 *   description: 'Logged progress for 30 consecutive days'
 * });
 * ```
 *
 * @example Social interactions
 * ```typescript
 * import { SocialEmailService } from '@/emails';
 *
 * await SocialEmailService.sendNewFollowerNotification({
 *   to: 'user@example.com',
 *   userName: 'John Doe',
 *   followerName: 'Jane Smith',
 *   followerProfile: 'https://tamatar.dev/profile/jane-smith'
 * });
 * ```
 */
