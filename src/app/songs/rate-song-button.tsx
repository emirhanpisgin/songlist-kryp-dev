"use client";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import SearchSongDialog from "./search-song-dialog";
import { buttonVariants } from "@/components/ui/button";
import { useState } from "react";
import { Item } from "@/lib/types/songs";
import RateSongDialog from "./rate-song-dialog";

export default function RateSongButton() {
    const [selectedSong, setSelectedSong] = useState<Item | undefined>(undefined)
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
            <DialogTrigger className={buttonVariants()}>
                İstediğin Şarkıyı Ekle!
            </DialogTrigger>
            {selectedSong ? (
                <RateSongDialog setSelectedSong={setSelectedSong} selectedSong={selectedSong} setOpen={setOpen} />
            ) : (
                <SearchSongDialog setSelectedSong={setSelectedSong} />
            )}
        </Dialog>
    );
}
