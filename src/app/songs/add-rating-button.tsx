"use client";

import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Star } from "lucide-react";
import { Image, Song } from "@/lib/types/songs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { ArtistDisplay } from "./artist-display";
import { addRatingAction } from "./actions";
import { toast } from "sonner";

export default function AddRatingButton({
    song
}: {
    song: Song
}) {
    const [pending, startTransition] = useTransition();
    const [open, setOpen] = useState(false);

    function handleRatingSubmit(formData: FormData) {
        startTransition(async () => {
            const comment = formData.get("comment")!.toString();
            const score = +formData.get("score")!;
            const result = await addRatingAction(song.id, comment, score);

            toast(result);
            setOpen(false);
        });
    }

    return (
        <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
            <DialogTrigger>
                <div className="flex text-sm items-center md:text-xl gap-1">
                    <Star className="size-4 md:size-6" /> Puanla
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle className="flex gap-2 items-center">
                    Şarkı Puanla
                </DialogTitle>
                <DialogDescription>
                    <span className="font-semibold">{song.name}</span> şarkısını hakkındaki görüşlerini yazabilir, puanlayabilirsin.
                </DialogDescription>
                <div className="flex gap-3 items-center">
                    <img src={(song.images as Image[])[2].url} alt="Song" className="rounded-lg" />
                    <div className="flex flex-col justify-center flex-1">
                        <div className="font-semibold">
                            {song.name}
                        </div>
                        <ArtistDisplay className="text-sm" artists={song.artists} />
                    </div>
                </div>
                <form className="space-y-3" action={handleRatingSubmit}>
                    <div className="space-y-1">
                        <Label htmlFor="comment">Yorum</Label>
                        <Textarea required maxLength={150} minLength={15} placeholder="Şarkı hakkındaki görüşlerin..." name="comment" />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="score">Puan</Label>
                        <Input required name="score" type="number" step={0.5} max={10} min={0} placeholder="Şarkıya puanın..." />
                    </div>
                    <div className="flex justify-end gap-3 items-center">
                        <Button variant={"ghost"} onClick={() => setOpen(false)}>
                            Geri
                        </Button>
                        <Button disabled={pending}>
                            Kaydet
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

