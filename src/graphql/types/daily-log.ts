import { builder } from "../pothos";

// DailyLog object type
builder.prismaObject("DailyLog", {
	fields: (t) => ({
		id: t.exposeID("id"),
		title: t.exposeString("title"),
		content: t.exposeString("content"),
		learned: t.exposeString("learned", { nullable: true }),
		challenges: t.exposeString("challenges", { nullable: true }),
		goals: t.exposeString("goals", { nullable: true }),
		mood: t.exposeString("mood", { nullable: true }),
		tags: t.exposeStringList("tags"),
		isPublic: t.exposeBoolean("isPublic"),
		createdAt: t.expose("createdAt", { type: "DateTime" }),
		updatedAt: t.expose("updatedAt", { type: "DateTime" }),

		// Relations
		user: t.relation("user"),
		project: t.relation("project"),
		resources: t.relation("resources"),
		commits: t.relation("commits"),
	}),
});

// Input types
const CreateDailyLogInputType = builder.inputType("CreateDailyLogInput", {
	fields: (t) => ({
		title: t.string({ required: true }),
		content: t.string({ required: true }),
		learned: t.string(),
		challenges: t.string(),
		goals: t.string(),
		mood: t.string(),
		tags: t.stringList({ defaultValue: [] }),
		isPublic: t.boolean({ defaultValue: false }),
		projectId: t.string(),
	}),
});

const UpdateDailyLogInputType = builder.inputType("UpdateDailyLogInput", {
	fields: (t) => ({
		id: t.string({ required: true }),
		title: t.string(),
		content: t.string(),
		learned: t.string(),
		challenges: t.string(),
		goals: t.string(),
		mood: t.string(),
		tags: t.stringList(),
		isPublic: t.boolean(),
		projectId: t.string(),
	}),
});