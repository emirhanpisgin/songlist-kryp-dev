import { LogOut, UserRound } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Session } from "next-auth";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

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
            <DropdownMenuContent className="p-3 flex items-center gap-3">
                <div className="text-center">
                    {data.user?.name}
                </div>
                <Button onClick={() => signOut()} size={"icon"} variant={"outline"}>
                    <LogOut />
                </Button>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
