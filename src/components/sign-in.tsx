"use client"
import { LogIn } from "lucide-react";
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link";
import { useSession } from "next-auth/react";
import ProfileButton from "./profile-button";

export default function SignIn() {
    const { data, status } = useSession();

    if (status != "authenticated") {
        return (
            <Link href={"/api/auth/signin"} className={buttonVariants({ variant: "ghost", size: "icon" })}>
                <LogIn />
            </Link>
        )
    }

    return <ProfileButton data={data} />;
}
