"use server";

import { auth } from "@/lib/auth";
import { getOrSaveSong, searchSong, searchSongById } from "@/lib/helpers/songs";
import { Item } from "@/lib/types/songs";
import { db } from "@/lib/db";
import { ratings } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";
import { eq, and } from "drizzle-orm";

export async function searchSongAction(query: string) {
	const session = await auth();

	if (!session) throw "Unauthorized";

	const searchData = await searchSong(query);

	return searchData as Item[];
}

export async function rateSongAction(itemId: string, comment: string, score: number) {
	try {
		const session = await auth();

		if (!session) throw "Unauthorized";

        const item = await searchSongById(itemId);

        if (!item) throw "";

		const isNew = await getOrSaveSong(item, session.user?.id!);

		await db.insert(ratings).values({
			comment,
			rating: score,
			songId: item.id,
			userId: session.user?.id!,
		});

		revalidatePath("/");

		return isNew ? "Şarkı ve puanlamanız başarıyla eklendi." : "Şarkı daha önce eklenmiş, puanlamanız eklendi.";
	} catch (err) {
		console.log(err);

		return "Bir hata oluştu lütfen daha sonra tekrar deneyin.";
	}
}

export async function addRatingAction(songId: string, comment: string, score: number) {
	try {
		const session = await auth();

		if (!session) throw "Unauthorized";

		const [rating] = await db
			.select()
			.from(ratings)
			.where(and(eq(ratings.songId, songId), eq(ratings.userId, session.user?.id!)));

		if (rating) {
			return "Her şarkıyı sadece bir kere puanlayabilirsiniz";
		}

		await db.insert(ratings).values({
			comment,
			rating: score,
			songId,
			userId: session.user?.id!,
		});

		revalidatePath("/");

		return "Puanlamanız ve yorumunuz başarıyla eklendi.";
	} catch (err) {
		console.log(err);

		return "Bir hata oluştu lütfen daha sonra tekrar deneyin.";
	}
}
