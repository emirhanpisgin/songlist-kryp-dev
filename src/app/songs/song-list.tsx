import { Item } from "@/lib/types/songs";
import SongDisplay from "./song-display";


interface SongListProps {
    items: Item[];
    setSelectedSong: (state: Item) => void;
}

export default function SongList({ items, setSelectedSong }: SongListProps) {
    return (
        <div className="space-y-3">
            {items.map((item) => (
                <SongDisplay
                    item={item}
                    searchList={true}
                    setSelectedSong={setSelectedSong}
                    key={item.id}
                />
            ))}
        </div>
    );
}
