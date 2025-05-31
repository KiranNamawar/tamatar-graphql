import { builder } from "../pothos";

// User object type
builder.prismaObject("User", {
	fields: (t) => ({
		id: t.exposeID("id"),
		email: t.exposeString("email"),
		username: t.exposeString("username"),
		name: t.exposeString("name", { nullable: true }),
		avatar: t.exposeString("avatar", { nullable: true }),
		bio: t.exposeString("bio", { nullable: true }),
		role: t.exposeString("role"),
		createdAt: t.expose("createdAt", { type: "DateTime" }),
		updatedAt: t.expose("updatedAt", { type: "DateTime" }),
		
		// Relations
		projects: t.relation("projects"),
		dailyLogs: t.relation("dailyLogs"),
		resources: t.relation("resources"),
		followers: t.relation("followers"),
		following: t.relation("following"),
	}),
});