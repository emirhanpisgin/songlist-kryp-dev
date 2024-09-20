import MaxWidthWrapper from "@/components/max-width-wrapper";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import RateSongButton from "./rate-song-button";
import { db } from "@/lib/db";
import { Image, SongWithRatingAndUser } from "@/lib/types/songs";
import { ArtistDisplay } from "./artist-display";
import { Separator } from "@/components/ui/separator";
import { Clock, Star } from "lucide-react";
import type { SVGProps } from 'react';
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import AddRatingButton from "./add-rating-button";
import { timePassed } from "@/lib/utils";


export default async function Songs() {
    const session = await auth();

    if (!session) {
        redirect("/login")
    }

    const songList = await db.query.songs.findMany({
        with: {
            ratings: {
                with: {
                    user: true
                }
            },
        }
    });

    return (
        <main>
            <MaxWidthWrapper className="mx-auto">
                <div className="text-4xl mt-7 mb-3 font-bold">
                    Şarkılar
                </div>
                <div className="text-xl mb-2 text-balance text-center">
                    Sen de favori şarkılarını ekleyerek diğer kullanıcılara katılabilirsin!
                </div>
                <div className="flex mx-auto py-5 gap-4 px-5 md:px-3 w-full justify-center">
                    <RateSongButton />
                </div>
                <div className="flex gap-3 flex-col w-full md:w-3/5 px-5 md:px-0 mb-16">
                    {songList.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).map((song) => (
                        <SongCard key={song.id} song={song} />
                    ))}
                </div>
            </MaxWidthWrapper>
        </main>
    );
}

function SongCard({ song }: { song: SongWithRatingAndUser }) {
    const initialRating = song.ratings.find(rating => rating.userId === song.authorId)!;
    const author = initialRating.user;
    const averageRating = (song.ratings.map(rating => rating.rating).reduce((accumulator, currentValue) => accumulator + currentValue)) / song.ratings.length;

    return (
        <div className="flex flex-col border p-3 md:p-4 rounded-lg gap-2">
            <div className="flex gap-3">
                <img src={(song.images as Image[])[1].url} alt="song" className="rounded-lg size-16 md:size-32" />
                <div className="flex justify-center flex-col w-full text-2xl font-semibold">
                    <div className="flex-1 flex justify-between">
                        <div className="text-lg md:text-2xl">
                            <div className="leading-5 md:leading-none">
                                {song.name}
                            </div>
                            <ArtistDisplay className="text-sm md:text-base font-normal" artists={song.artists} />
                        </div>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger className="flex gap-1 text-sm items-center md:text-xl h-min"><Star className="size-4 md:size-6" /> {averageRating.toFixed(1)}</TooltipTrigger>
                                <TooltipContent>
                                    Ortalama Puan
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <div className="flex text-lg w-full justify-between">
                        <Link href={song.uri} className="flex gap-1 items-center text-xs md:text-xl">
                            <SpotifyIcon className="size-5 md:size-7" /> Spotify&apos;da dinle
                        </Link>
                        <AddRatingButton song={song} />
                    </div>
                </div>
            </div>
            <Separator className="my-1 md:my-2" />
            <div className="flex gap-3">
                <img src={author.image!} className="size-9 md:size-12 rounded-full" alt="User" />
                <div className="flex flex-col w-full">
                    <div className="flex gap-2 h-min text-base md:text-xl w-full">
                        <div className="flex-1 flex items-center gap-4">
                            {author.name}
                            <div className="text-sm flex gap-1 items-center">
                                <Clock className="size-4 md:size-5" /> {timePassed(initialRating.createdAt)}
                            </div>
                        </div>
                        <div className="flex text-sm md:text-xl items-center gap-1">
                            <Star className="size-4 md:size-6" />
                            {initialRating.rating}
                        </div>
                    </div>
                    <div className="italic text-sm md:text-base">
                        &quot;{initialRating.comment}&quot;
                    </div>
                </div>
            </div>
            {song.ratings.length > 1 && <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger className="py-2 md:py-4">Puanlar</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-2">
                        {song.ratings.filter(rating => rating.id !== initialRating.id).map((rating) => (
                            <div className="flex gap-3" key={rating.id}>
                                <img src={rating.user.image!} className="size-9 md:size-12 rounded-full" alt="User" />
                                <div className="flex flex-col w-full">
                                    <div className="flex gap-2 h-min text-base md:text-xl w-full">
                                        <div className="flex-1 flex items-center gap-4">
                                            {rating.user.name}
                                            <div className="text-sm flex gap-1 items-center">
                                                <Clock className="size-4 md:size-5" /> {timePassed(rating.createdAt)}
                                            </div>
                                        </div>
                                        <div className="flex items-center text-sm md:text-xl gap-1">
                                            <Star className="size-4 md:size-6" />
                                            {rating.rating}
                                        </div>
                                    </div>
                                    <div className="italic">
                                        &quot;{rating.comment}&quot;
                                    </div>
                                </div>
                            </div>
                        ))}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>}
        </div>
    );
}

function SpotifyIcon(props: SVGProps<SVGSVGElement>) {
    return (<svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M17.9 10.9C14.7 9 9.35 8.8 6.3 9.75c-.5.15-1-.15-1.15-.6c-.15-.5.15-1 .6-1.15c3.55-1.05 9.4-.85 13.1 1.35c.45.25.6.85.35 1.3c-.25.35-.85.5-1.3.25m-.1 2.8c-.25.35-.7.5-1.05.25c-2.7-1.65-6.8-2.15-9.95-1.15c-.4.1-.85-.1-.95-.5s.1-.85.5-.95c3.65-1.1 8.15-.55 11.25 1.35c.3.15.45.65.2 1m-1.2 2.75c-.2.3-.55.4-.85.2c-2.35-1.45-5.3-1.75-8.8-.95c-.35.1-.65-.15-.75-.45c-.1-.35.15-.65.45-.75c3.8-.85 7.1-.5 9.7 1.1c.35.15.4.55.25.85M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2"></path></svg>);
}
