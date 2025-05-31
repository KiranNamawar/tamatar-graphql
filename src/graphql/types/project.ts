import { builder } from "../pothos";

// Project object type
builder.prismaObject("Project", {
	fields: (t) => ({
		id: t.exposeID("id"),
		name: t.exposeString("name"),
		description: t.exposeString("description", { nullable: true }),
		status: t.exposeString("status"),
		githubUrl: t.exposeString("githubUrl", { nullable: true }),
		demoUrl: t.exposeString("demoUrl", { nullable: true }),
		tags: t.exposeStringList("tags"),
		isPublic: t.exposeBoolean("isPublic"),
		createdAt: t.expose("createdAt", { type: "DateTime" }),
		updatedAt: t.expose("updatedAt", { type: "DateTime" }),

		// Relations
		user: t.relation("user"),
		dailyLogs: t.relation("dailyLogs"),
		commits: t.relation("commits"),
	}),
});