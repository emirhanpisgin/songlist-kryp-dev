import { boolean, timestamp, pgTable, text, primaryKey, integer, json, real } from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "next-auth/adapters";
import { Image } from "../types/songs";
import { relations, sql } from "drizzle-orm";

export const users = pgTable("user", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text("name"),
	email: text("email").notNull(),
	emailVerified: timestamp("emailVerified", { mode: "date" }),
	image: text("image"),
});

export const accounts = pgTable(
	"account",
	{
		userId: text("userId")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		type: text("type").$type<AdapterAccountType>().notNull(),
		provider: text("provider").notNull(),
		providerAccountId: text("providerAccountId").notNull(),
		refresh_token: text("refresh_token"),
		access_token: text("access_token"),
		expires_at: integer("expires_at"),
		token_type: text("token_type"),
		scope: text("scope"),
		id_token: text("id_token"),
		session_state: text("session_state"),
	},
	(account) => ({
		compoundKey: primaryKey({
			columns: [account.provider, account.providerAccountId],
		}),
	})
);

export const sessions = pgTable("session", {
	sessionToken: text("sessionToken").primaryKey(),
	userId: text("userId")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
	"verificationToken",
	{
		identifier: text("identifier").notNull(),
		token: text("token").notNull(),
		expires: timestamp("expires", { mode: "date" }).notNull(),
	},
	(verificationToken) => ({
		compositePk: primaryKey({
			columns: [verificationToken.identifier, verificationToken.token],
		}),
	})
);

export const authenticators = pgTable(
	"authenticator",
	{
		credentialID: text("credentialID").notNull().unique(),
		userId: text("userId")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		providerAccountId: text("providerAccountId").notNull(),
		credentialPublicKey: text("credentialPublicKey").notNull(),
		counter: integer("counter").notNull(),
		credentialDeviceType: text("credentialDeviceType").notNull(),
		credentialBackedUp: boolean("credentialBackedUp").notNull(),
		transports: text("transports"),
	},
	(authenticator) => ({
		compositePK: primaryKey({
			columns: [authenticator.userId, authenticator.credentialID],
		}),
	})
);

export const songs = pgTable("song", {
	id: text("id").primaryKey().notNull(),
	name: text("name").notNull(),
	authorId: text("authorId").notNull(),
	artists: text("artists").array().notNull(),
	images: json("image").$type<Image>().array(3).notNull(),
	createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export const songsRelations = relations(songs, ({ many }) => ({
	ratings: many(ratings),
}));

export const ratings = pgTable("rating", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	rating: real("rating").notNull(),
	comment: text("comment").notNull(),
	createdAt: timestamp("createdAt").notNull().defaultNow(),
	userId: text("userId")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	songId: text("songId")
		.notNull()
		.references(() => songs.id, { onDelete: "cascade" }),
});

export const ratingsRelations = relations(ratings, ({ one }) => ({
	song: one(songs, {
		fields: [ratings.songId],
		references: [songs.id],
	}),
    user: one(users, {
        fields: [ratings.userId],
        references: [users.id]
    })
}));
