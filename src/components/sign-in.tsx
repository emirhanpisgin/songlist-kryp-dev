"use client"
import { LogIn } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function SignIn() {
    const { data, status } = useSession();

    if (status != "authenticated") {
        return (
            <Link href={"/api/auth/signin"} className={buttonVariants({ variant: "ghost", size: "icon" })}>
                <LogIn />
            </Link>
        )
    }

    return (
        <Avatar>
            <AvatarImage src={data.user?.image!} />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    )
}
