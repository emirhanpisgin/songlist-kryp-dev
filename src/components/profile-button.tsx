import { ListMusic, LogOut, MessageSquare, Settings, UserRound } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Session } from "next-auth";
import { Button, buttonVariants } from "./ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function ProfileButton({
    data
}: {
    data: Session
}) {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={data.user?.image!} alt="Profile" />
                    <AvatarFallback>
                        <UserRound />
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-3 space-y-1">
                <div className="text-center">
                    {data.user?.name}
                </div>
                <div className="flex gap-1">
                    <Link href={"/profile"} className={buttonVariants({ variant: "outline", size: "icon"})}>
                        <ListMusic />
                    </Link>
                    <Button onClick={() => signOut()} size={"icon"} variant={"outline"}>
                        <LogOut />
                    </Button>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
