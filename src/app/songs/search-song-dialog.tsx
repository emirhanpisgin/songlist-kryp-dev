"use client";

import { Button } from "@/components/ui/button";
import { DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { searchSongAction } from "./actions";
import { useState, useTransition } from "react";
import { Item } from "@/lib/types/songs";
import SongList from "./song-list";

interface SearchSongDialogProps {
    setSelectedSong: (state: Item) => void;
}

export default function SearchSongDialog({ setSelectedSong }: SearchSongDialogProps) {
    const [pending, startTransition] = useTransition();
    const [searchInput, setSearchInput] = useState("");
    const [searchResults, setSearchResults] = useState<Item[] | undefined>(undefined);

    function handleSearchSubmit() {
        startTransition(async () => {
            const results = await searchSongAction(searchInput);
            setSearchResults(results);
        });
    }

    return (
        <DialogContent>
            <DialogTitle>
                Şarkı Ara
            </DialogTitle>
            <DialogDescription>
                Aramaya başlamak için şarkının adını yazıp &quot;Ara&quot; butonuna bas.
            </DialogDescription>
            <form className="flex gap-5" action={handleSearchSubmit}>
                <Input required maxLength={20} minLength={3} value={searchInput} onChange={(e) => setSearchInput(e.target.value)} placeholder="Şarkı adı..." />
                <Button type="submit" disabled={pending}>
                    Ara
                </Button>
            </form>
            {(searchResults) && <SongList setSelectedSong={setSelectedSong} items={searchResults} />}
        </DialogContent>
    );
}
