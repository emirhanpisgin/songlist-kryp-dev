import { Button } from "@/components/ui/button";
import { DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Item } from "@/lib/types/songs";
import SongDisplay from "./song-display";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useTransition } from "react";
import { rateSongAction } from "./actions";
import { toast } from "sonner";

interface RateSongDialogProps {
    selectedSong: Item;
    setSelectedSong: (state?: Item) => void;
    setOpen: (state: boolean) => void;
}

export default function RateSongDialog({ selectedSong, setSelectedSong, setOpen }: RateSongDialogProps) {
    const [pending, startTransition] = useTransition();

    function handleSongSubmit(formData: FormData) {
        startTransition(async () => {
            const comment = formData.get("comment")!.toString();
            const score = +formData.get("score")!;
            const result = await rateSongAction(selectedSong.id, comment, score);

            toast(result);
            setSelectedSong(undefined);
            setOpen(false);
        });
    }

    return (
        <DialogContent>
            <DialogTitle className="flex gap-2 items-center">
                Şarkı Puanla
            </DialogTitle>
            <DialogDescription>
                <span className="font-semibold">{selectedSong.name}</span> şarkısını hakkındaki görüşlerini yazabilir, puanlayabilirsin.
            </DialogDescription>
            <SongDisplay item={selectedSong} setSelectedSong={setSelectedSong} />
            <form className="space-y-3" action={handleSongSubmit}>
                <div className="space-y-1">
                    <Label htmlFor="comment">Yorum</Label>
                    <Textarea required maxLength={150} minLength={15} placeholder="Şarkı hakkındaki görüşlerin..." name="comment" />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="score">Puan</Label>
                    <Input required name="score" type="number" step={0.5} max={10} min={0} placeholder="Şarkıya puanın..." />
                </div>
                <div className="flex justify-end gap-3 items-center">
                    <Button variant={"ghost"} onClick={() => setSelectedSong(undefined)}>
                        Geri
                    </Button>
                    <Button disabled={pending}>
                        Kaydet
                    </Button>
                </div>
            </form>
        </DialogContent>
    );
}
