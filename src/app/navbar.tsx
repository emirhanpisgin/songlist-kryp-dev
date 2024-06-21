import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";

export default function Navbar() {
    return (
        <div className="flex items-center p-4 bg-primary-foreground border-b">
            <div className="flex-1">
                <Link href={"/"} className="text-3xl font-semibold">
                    SongList
                </Link>
            </div>
            <div className="h-full aspect-square">
                <ModeToggle />
            </div>
        </div>
    );
}
