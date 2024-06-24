"use client";

import { buttonVariants } from "@/components/ui/button"
import Link from "next/link";

export default function Home() {
    return (
        <main className="flex-1 grid place-items-center text-center">
            <div className="w-full px-2 md:w-1/2 flex flex-col gap-2">
                <div className="text-2xl md:text-4xl animate-slide-in [--slide-in-delay:200ms] opacity-0">
                    <b>SongList</b>&apos;e hoşgeldin.
                </div>
                <div className="text-xl text-balance md:text-2xl animate-slide-in [--slide-in-delay:400ms] opacity-0">
                    Favori şarkılarını puanlayabilir, yorumlayabilir, diğer kullanıcılarla paylaşabilirsin.
                </div>
                <div className="flex gap-3 justify-center animate-slide-in [--slide-in-delay:600ms] opacity-0">
                    <Link href={"/songs"} className={buttonVariants({ variant: "outline" })}>
                        Şarkılar
                    </Link>
                </div>
            </div>
        </main>
    );
}
