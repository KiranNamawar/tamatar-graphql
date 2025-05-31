/* eslint-disable */
import type { Prisma, Goal, FocusSession, Mood, CodeMetric, SkillProgress, Quiz, User, Session, EmailVerificationToken, PasswordResetToken, Project, DailyLog, Commit, DailyLogCommit, Resource, DailyLogResource, ResourceRating, LearningPath, LearningPathItem, Follow, Achievement, UserAchievement, Notification, MentorshipRequest } from "C:\\Users\\kiran\\Dev\\Tamatar\\tamatar-graphql\\src\\generated\\prisma/index.js";
export default interface PrismaTypes {
    Goal: {
        Name: "Goal";
        Shape: Goal;
        Include: Prisma.GoalInclude;
        Select: Prisma.GoalSelect;
        OrderBy: Prisma.GoalOrderByWithRelationInput;
        WhereUnique: Prisma.GoalWhereUniqueInput;
        Where: Prisma.GoalWhereInput;
        Create: {};
        Update: {};
        RelationName: "user";
        ListRelations: never;
        Relations: {
            user: {
                Shape: User;
                Name: "User";
                Nullable: false;
            };
        };
    };
    FocusSession: {
        Name: "FocusSession";
        Shape: FocusSession;
        Include: Prisma.FocusSessionInclude;
        Select: Prisma.FocusSessionSelect;
        OrderBy: Prisma.FocusSessionOrderByWithRelationInput;
        WhereUnique: Prisma.FocusSessionWhereUniqueInput;
        Where: Prisma.FocusSessionWhereInput;
        Create: {};
        Update: {};
        RelationName: "user" | "project";
        ListRelations: never;
        Relations: {
            user: {
                Shape: User;
                Name: "User";
                Nullable: false;
            };
            project: {
                Shape: Project | null;
                Name: "Project";
                Nullable: true;
            };
        };
    };
    Mood: {
        Name: "Mood";
        Shape: Mood;
        Include: Prisma.MoodInclude;
        Select: Prisma.MoodSelect;
        OrderBy: Prisma.MoodOrderByWithRelationInput;
        WhereUnique: Prisma.MoodWhereUniqueInput;
        Where: Prisma.MoodWhereInput;
        Create: {};
        Update: {};
        RelationName: "user";
        ListRelations: never;
        Relations: {
            user: {
                Shape: User;
                Name: "User";
                Nullable: false;
            };
        };
    };
    CodeMetric: {
        Name: "CodeMetric";
        Shape: CodeMetric;
        Include: Prisma.CodeMetricInclude;
        Select: Prisma.CodeMetricSelect;
        OrderBy: Prisma.CodeMetricOrderByWithRelationInput;
        WhereUnique: Prisma.CodeMetricWhereUniqueInput;
        Where: Prisma.CodeMetricWhereInput;
        Create: {};
        Update: {};
        RelationName: "project";
        ListRelations: never;
        Relations: {
            project: {
                Shape: Project;
                Name: "Project";
                Nullable: false;
            };
        };
    };
    SkillProgress: {
        Name: "SkillProgress";
        Shape: SkillProgress;
        Include: Prisma.SkillProgressInclude;
        Select: Prisma.SkillProgressSelect;
        OrderBy: Prisma.SkillProgressOrderByWithRelationInput;
        WhereUnique: Prisma.SkillProgressWhereUniqueInput;
        Where: Prisma.SkillProgressWhereInput;
        Create: {};
        Update: {};
        RelationName: "user";
        ListRelations: never;
        Relations: {
            user: {
                Shape: User;
                Name: "User";
                Nullable: false;
            };
        };
    };
    Quiz: {
        Name: "Quiz";
        Shape: Quiz;
        Include: Prisma.QuizInclude;
        Select: Prisma.QuizSelect;
        OrderBy: Prisma.QuizOrderByWithRelationInput;
        WhereUnique: Prisma.QuizWhereUniqueInput;
        Where: Prisma.QuizWhereInput;
        Create: {};
        Update: {};
        RelationName: "user";
        ListRelations: never;
        Relations: {
            user: {
                Shape: User;
                Name: "User";
                Nullable: false;
            };
        };
    };
    User: {
        Name: "User";
        Shape: User;
        Include: Prisma.UserInclude;
        Select: Prisma.UserSelect;
        OrderBy: Prisma.UserOrderByWithRelationInput;
        WhereUnique: Prisma.UserWhereUniqueInput;
        Where: Prisma.UserWhereInput;
        Create: {};
        Update: {};
        RelationName: "sessions" | "emailVerificationTokens" | "passwordResetTokens" | "projects" | "dailyLogs" | "resources" | "resourceRatings" | "learningPaths" | "followers" | "following" | "achievements" | "goals" | "focusSessions" | "moods" | "skillProgresses" | "quizzes" | "notifications" | "menteeRequests" | "mentorRequests";
        ListRelations: "sessions" | "emailVerificationTokens" | "passwordResetTokens" | "projects" | "dailyLogs" | "resources" | "resourceRatings" | "learningPaths" | "followers" | "following" | "achievements" | "goals" | "focusSessions" | "moods" | "skillProgresses" | "quizzes" | "notifications" | "menteeRequests" | "mentorRequests";
        Relations: {
            sessions: {
                Shape: Session[];
                Name: "Session";
                Nullable: false;
            };
            emailVerificationTokens: {
                Shape: EmailVerificationToken[];
                Name: "EmailVerificationToken";
                Nullable: false;
            };
            passwordResetTokens: {
                Shape: PasswordResetToken[];
                Name: "PasswordResetToken";
                Nullable: false;
            };
            projects: {
                Shape: Project[];
                Name: "Project";
                Nullable: false;
            };
            dailyLogs: {
                Shape: DailyLog[];
                Name: "DailyLog";
                Nullable: false;
            };
            resources: {
                Shape: Resource[];
                Name: "Resource";
                Nullable: false;
            };
            resourceRatings: {
                Shape: ResourceRating[];
                Name: "ResourceRating";
                Nullable: false;
            };
            learningPaths: {
                Shape: LearningPath[];
                Name: "LearningPath";
                Nullable: false;
            };
            followers: {
                Shape: Follow[];
                Name: "Follow";
                Nullable: false;
            };
            following: {
                Shape: Follow[];
                Name: "Follow";
                Nullable: false;
            };
            achievements: {
                Shape: UserAchievement[];
                Name: "UserAchievement";
                Nullable: false;
            };
            goals: {
                Shape: Goal[];
                Name: "Goal";
                Nullable: false;
            };
            focusSessions: {
                Shape: FocusSession[];
                Name: "FocusSession";
                Nullable: false;
            };
            moods: {
                Shape: Mood[];
                Name: "Mood";
                Nullable: false;
            };
            skillProgresses: {
                Shape: SkillProgress[];
                Name: "SkillProgress";
                Nullable: false;
            };
            quizzes: {
                Shape: Quiz[];
                Name: "Quiz";
                Nullable: false;
            };
            notifications: {
                Shape: Notification[];
                Name: "Notification";
                Nullable: false;
            };
            menteeRequests: {
                Shape: MentorshipRequest[];
                Name: "MentorshipRequest";
                Nullable: false;
            };
            mentorRequests: {
                Shape: MentorshipRequest[];
                Name: "MentorshipRequest";
                Nullable: false;
            };
        };
    };
    Session: {
        Name: "Session";
        Shape: Session;
        Include: Prisma.SessionInclude;
        Select: Prisma.SessionSelect;
        OrderBy: Prisma.SessionOrderByWithRelationInput;
        WhereUnique: Prisma.SessionWhereUniqueInput;
        Where: Prisma.SessionWhereInput;
        Create: {};
        Update: {};
        RelationName: "user";
        ListRelations: never;
        Relations: {
            user: {
                Shape: User;
                Name: "User";
                Nullable: false;
            };
        };
    };
    EmailVerificationToken: {
        Name: "EmailVerificationToken";
        Shape: EmailVerificationToken;
        Include: Prisma.EmailVerificationTokenInclude;
        Select: Prisma.EmailVerificationTokenSelect;
        OrderBy: Prisma.EmailVerificationTokenOrderByWithRelationInput;
        WhereUnique: Prisma.EmailVerificationTokenWhereUniqueInput;
        Where: Prisma.EmailVerificationTokenWhereInput;
        Create: {};
        Update: {};
        RelationName: "user";
        ListRelations: never;
        Relations: {
            user: {
                Shape: User;
                Name: "User";
                Nullable: false;
            };
        };
    };
    PasswordResetToken: {
        Name: "PasswordResetToken";
        Shape: PasswordResetToken;
        Include: Prisma.PasswordResetTokenInclude;
        Select: Prisma.PasswordResetTokenSelect;
        OrderBy: Prisma.PasswordResetTokenOrderByWithRelationInput;
        WhereUnique: Prisma.PasswordResetTokenWhereUniqueInput;
        Where: Prisma.PasswordResetTokenWhereInput;
        Create: {};
        Update: {};
        RelationName: "user";
        ListRelations: never;
        Relations: {
            user: {
                Shape: User;
                Name: "User";
                Nullable: false;
            };
        };
    };
    Project: {
        Name: "Project";
        Shape: Project;
        Include: Prisma.ProjectInclude;
        Select: Prisma.ProjectSelect;
        OrderBy: Prisma.ProjectOrderByWithRelationInput;
        WhereUnique: Prisma.ProjectWhereUniqueInput;
        Where: Prisma.ProjectWhereInput;
        Create: {};
        Update: {};
        RelationName: "user" | "dailyLogs" | "commits" | "focusSessions" | "codeMetrics";
        ListRelations: "dailyLogs" | "commits" | "focusSessions" | "codeMetrics";
        Relations: {
            user: {
                Shape: User;
                Name: "User";
                Nullable: false;
            };
            dailyLogs: {
                Shape: DailyLog[];
                Name: "DailyLog";
                Nullable: false;
            };
            commits: {
                Shape: Commit[];
                Name: "Commit";
                Nullable: false;
            };
            focusSessions: {
                Shape: FocusSession[];
                Name: "FocusSession";
                Nullable: false;
            };
            codeMetrics: {
                Shape: CodeMetric[];
                Name: "CodeMetric";
                Nullable: false;
            };
        };
    };
    DailyLog: {
        Name: "DailyLog";
        Shape: DailyLog;
        Include: Prisma.DailyLogInclude;
        Select: Prisma.DailyLogSelect;
        OrderBy: Prisma.DailyLogOrderByWithRelationInput;
        WhereUnique: Prisma.DailyLogWhereUniqueInput;
        Where: Prisma.DailyLogWhereInput;
        Create: {};
        Update: {};
        RelationName: "user" | "project" | "resources" | "commits";
        ListRelations: "resources" | "commits";
        Relations: {
            user: {
                Shape: User;
                Name: "User";
                Nullable: false;
            };
            project: {
                Shape: Project | null;
                Name: "Project";
                Nullable: true;
            };
            resources: {
                Shape: DailyLogResource[];
                Name: "DailyLogResource";
                Nullable: false;
            };
            commits: {
                Shape: DailyLogCommit[];
                Name: "DailyLogCommit";
                Nullable: false;
            };
        };
    };
    Commit: {
        Name: "Commit";
        Shape: Commit;
        Include: Prisma.CommitInclude;
        Select: Prisma.CommitSelect;
        OrderBy: Prisma.CommitOrderByWithRelationInput;
        WhereUnique: Prisma.CommitWhereUniqueInput;
        Where: Prisma.CommitWhereInput;
        Create: {};
        Update: {};
        RelationName: "project" | "dailyLogCommits";
        ListRelations: "dailyLogCommits";
        Relations: {
            project: {
                Shape: Project;
                Name: "Project";
                Nullable: false;
            };
            dailyLogCommits: {
                Shape: DailyLogCommit[];
                Name: "DailyLogCommit";
                Nullable: false;
            };
        };
    };
    DailyLogCommit: {
        Name: "DailyLogCommit";
        Shape: DailyLogCommit;
        Include: Prisma.DailyLogCommitInclude;
        Select: Prisma.DailyLogCommitSelect;
        OrderBy: Prisma.DailyLogCommitOrderByWithRelationInput;
        WhereUnique: Prisma.DailyLogCommitWhereUniqueInput;
        Where: Prisma.DailyLogCommitWhereInput;
        Create: {};
        Update: {};
        RelationName: "dailyLog" | "commit";
        ListRelations: never;
        Relations: {
            dailyLog: {
                Shape: DailyLog;
                Name: "DailyLog";
                Nullable: false;
            };
            commit: {
                Shape: Commit;
                Name: "Commit";
                Nullable: false;
            };
        };
    };
    Resource: {
        Name: "Resource";
        Shape: Resource;
        Include: Prisma.ResourceInclude;
        Select: Prisma.ResourceSelect;
        OrderBy: Prisma.ResourceOrderByWithRelationInput;
        WhereUnique: Prisma.ResourceWhereUniqueInput;
        Where: Prisma.ResourceWhereInput;
        Create: {};
        Update: {};
        RelationName: "user" | "dailyLogResources" | "resourceRatings" | "learningPathItems";
        ListRelations: "dailyLogResources" | "resourceRatings" | "learningPathItems";
        Relations: {
            user: {
                Shape: User;
                Name: "User";
                Nullable: false;
            };
            dailyLogResources: {
                Shape: DailyLogResource[];
                Name: "DailyLogResource";
                Nullable: false;
            };
            resourceRatings: {
                Shape: ResourceRating[];
                Name: "ResourceRating";
                Nullable: false;
            };
            learningPathItems: {
                Shape: LearningPathItem[];
                Name: "LearningPathItem";
                Nullable: false;
            };
        };
    };
    DailyLogResource: {
        Name: "DailyLogResource";
        Shape: DailyLogResource;
        Include: Prisma.DailyLogResourceInclude;
        Select: Prisma.DailyLogResourceSelect;
        OrderBy: Prisma.DailyLogResourceOrderByWithRelationInput;
        WhereUnique: Prisma.DailyLogResourceWhereUniqueInput;
        Where: Prisma.DailyLogResourceWhereInput;
        Create: {};
        Update: {};
        RelationName: "dailyLog" | "resource";
        ListRelations: never;
        Relations: {
            dailyLog: {
                Shape: DailyLog;
                Name: "DailyLog";
                Nullable: false;
            };
            resource: {
                Shape: Resource;
                Name: "Resource";
                Nullable: false;
            };
        };
    };
    ResourceRating: {
        Name: "ResourceRating";
        Shape: ResourceRating;
        Include: Prisma.ResourceRatingInclude;
        Select: Prisma.ResourceRatingSelect;
        OrderBy: Prisma.ResourceRatingOrderByWithRelationInput;
        WhereUnique: Prisma.ResourceRatingWhereUniqueInput;
        Where: Prisma.ResourceRatingWhereInput;
        Create: {};
        Update: {};
        RelationName: "user" | "resource";
        ListRelations: never;
        Relations: {
            user: {
                Shape: User;
                Name: "User";
                Nullable: false;
            };
            resource: {
                Shape: Resource;
                Name: "Resource";
                Nullable: false;
            };
        };
    };
    LearningPath: {
        Name: "LearningPath";
        Shape: LearningPath;
        Include: Prisma.LearningPathInclude;
        Select: Prisma.LearningPathSelect;
        OrderBy: Prisma.LearningPathOrderByWithRelationInput;
        WhereUnique: Prisma.LearningPathWhereUniqueInput;
        Where: Prisma.LearningPathWhereInput;
        Create: {};
        Update: {};
        RelationName: "user" | "items";
        ListRelations: "items";
        Relations: {
            user: {
                Shape: User;
                Name: "User";
                Nullable: false;
            };
            items: {
                Shape: LearningPathItem[];
                Name: "LearningPathItem";
                Nullable: false;
            };
        };
    };
    LearningPathItem: {
        Name: "LearningPathItem";
        Shape: LearningPathItem;
        Include: Prisma.LearningPathItemInclude;
        Select: Prisma.LearningPathItemSelect;
        OrderBy: Prisma.LearningPathItemOrderByWithRelationInput;
        WhereUnique: Prisma.LearningPathItemWhereUniqueInput;
        Where: Prisma.LearningPathItemWhereInput;
        Create: {};
        Update: {};
        RelationName: "learningPath" | "resource";
        ListRelations: never;
        Relations: {
            learningPath: {
                Shape: LearningPath;
                Name: "LearningPath";
                Nullable: false;
            };
            resource: {
                Shape: Resource;
                Name: "Resource";
                Nullable: false;
            };
        };
    };
    Follow: {
        Name: "Follow";
        Shape: Follow;
        Include: Prisma.FollowInclude;
        Select: Prisma.FollowSelect;
        OrderBy: Prisma.FollowOrderByWithRelationInput;
        WhereUnique: Prisma.FollowWhereUniqueInput;
        Where: Prisma.FollowWhereInput;
        Create: {};
        Update: {};
        RelationName: "follower" | "following";
        ListRelations: never;
        Relations: {
            follower: {
                Shape: User;
                Name: "User";
                Nullable: false;
            };
            following: {
                Shape: User;
                Name: "User";
                Nullable: false;
            };
        };
    };
    Achievement: {
        Name: "Achievement";
        Shape: Achievement;
        Include: Prisma.AchievementInclude;
        Select: Prisma.AchievementSelect;
        OrderBy: Prisma.AchievementOrderByWithRelationInput;
        WhereUnique: Prisma.AchievementWhereUniqueInput;
        Where: Prisma.AchievementWhereInput;
        Create: {};
        Update: {};
        RelationName: "userAchievements";
        ListRelations: "userAchievements";
        Relations: {
            userAchievements: {
                Shape: UserAchievement[];
                Name: "UserAchievement";
                Nullable: false;
            };
        };
    };
    UserAchievement: {
        Name: "UserAchievement";
        Shape: UserAchievement;
        Include: Prisma.UserAchievementInclude;
        Select: Prisma.UserAchievementSelect;
        OrderBy: Prisma.UserAchievementOrderByWithRelationInput;
        WhereUnique: Prisma.UserAchievementWhereUniqueInput;
        Where: Prisma.UserAchievementWhereInput;
        Create: {};
        Update: {};
        RelationName: "user" | "achievement";
        ListRelations: never;
        Relations: {
            user: {
                Shape: User;
                Name: "User";
                Nullable: false;
            };
            achievement: {
                Shape: Achievement;
                Name: "Achievement";
                Nullable: false;
            };
        };
    };
    Notification: {
        Name: "Notification";
        Shape: Notification;
        Include: Prisma.NotificationInclude;
        Select: Prisma.NotificationSelect;
        OrderBy: Prisma.NotificationOrderByWithRelationInput;
        WhereUnique: Prisma.NotificationWhereUniqueInput;
        Where: Prisma.NotificationWhereInput;
        Create: {};
        Update: {};
        RelationName: "user";
        ListRelations: never;
        Relations: {
            user: {
                Shape: User;
                Name: "User";
                Nullable: false;
            };
        };
    };
    MentorshipRequest: {
        Name: "MentorshipRequest";
        Shape: MentorshipRequest;
        Include: Prisma.MentorshipRequestInclude;
        Select: Prisma.MentorshipRequestSelect;
        OrderBy: Prisma.MentorshipRequestOrderByWithRelationInput;
        WhereUnique: Prisma.MentorshipRequestWhereUniqueInput;
        Where: Prisma.MentorshipRequestWhereInput;
        Create: {};
        Update: {};
        RelationName: "mentee" | "mentor";
        ListRelations: never;
        Relations: {
            mentee: {
                Shape: User;
                Name: "User";
                Nullable: false;
            };
            mentor: {
                Shape: User;
                Name: "User";
                Nullable: false;
            };
        };
    };
}