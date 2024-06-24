import { Item } from "../types/songs";
import { getAccessToken } from "./utils";
import { db } from "../db";
import { eq } from "drizzle-orm";
import { songs } from "../db/schema";

export async function searchSong(query: string) {
	const { access_token } = await getAccessToken();

	const encodedQuery = encodeURIComponent(query);

	const queryParams = `q=${encodedQuery}&type=track&market=TR&limit=5`;

	const results = await fetch(`https://api.spotify.com/v1/search?${queryParams}`, {
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
	});

	const data = await results.json();
	return data.tracks.items;
}

export async function getOrSaveSong(item: Item, userId: string) {
	const [song] = await db.select().from(songs).where(eq(songs.id, item.id)).limit(1);

	if (!song) {
		await db
			.insert(songs)
			.values({
				id: item.id,
				artists: item.artists.map((artist) => artist.name),
				authorId: userId,
				images: item.album.images,
				name: item.name,
			})
			.returning();

		return true;
	}

	return false;
}
