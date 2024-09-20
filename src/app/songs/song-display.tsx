import { Button } from "@/components/ui/button";
import { Item } from "@/lib/types/songs";
import { ArtistDisplay } from "./artist-display";

interface SongDisplayProps {
    item: Item;
    searchList?: boolean;
    setSelectedSong: (state: Item) => void;
}

export default function SongDisplay({ item, searchList = false, setSelectedSong }: SongDisplayProps) {
    return (
        <div className="flex gap-3 items-center" key={item.id}>
            <img src={item.album.images[2].url} alt="Song" className="rounded-lg" />
            <div className="flex flex-col justify-center flex-1">
                <div className="font-semibold">
                    {item.name}
                </div>
                <ArtistDisplay className="text-sm" artists={item.artists.map((artist) => artist.name)} />
            </div>
            {searchList && <Button onClick={() => setSelectedSong(item)}>
                Puanla
            </Button>}
        </div>
    );
}