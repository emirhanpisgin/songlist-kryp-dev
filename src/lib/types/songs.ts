import { InferSelectModel } from "drizzle-orm";
import { ratings, songs, users } from "../db/schema";

export interface Album {
	album_type: string;
	artists: Artist[];
	external_urls: ExternalUrls;
	href: string;
	id: string;
	images: Image[];
	is_playable: boolean;
	name: string;
	release_date: string;
	total_tracks: number;
	type: string;
	uri: string;
}

export interface Item {
	album: Album;
	artists: Artist[];
	disc_number: number;
	duration_ms: number;
	explicit: boolean;
	external_ids: ExternalIds;
	external_urls: ExternalUrls;
	href: string;
	id: string;
	is_local: boolean;
	is_playable: boolean;
	name: string;
	popularity: number;
	preview_url: string;
	track_number: number;
	type: string;
	uri: string;
}

export interface ExternalUrls {
	spotify: string;
}

export interface Image {
	height: number;
	url: string;
	width: number;
}

export interface Artist {
	external_urls: ExternalUrls;
	href: string;
	id: string;
	name: string;
	type: string;
	uri: string;
}

export interface ExternalIds {
	isrc: string;
}

export type Song = InferSelectModel<typeof songs>;

export type Rating = InferSelectModel<typeof ratings>;

export type User = InferSelectModel<typeof users>;

export type RatingWithUser = Rating & {
	user: User;
};

export type SongWithRatingAndUser = Song & {
	ratings: RatingWithUser[];
};
