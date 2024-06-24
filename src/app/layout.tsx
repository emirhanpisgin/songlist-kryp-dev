import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "@/components/providers";
import Navbar from "./navbar";
import { Toaster } from "@/components/ui/sonner"

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans"
});

export const metadata: Metadata = {
    title: "SongList",
    description: "Built by KrypDev",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={cn(
                    "min-h-screen bg-background font-sans antialiased flex flex-col",
                    fontSans.variable
                )}
            >
                <Providers>
                    <Navbar />
                    {children}
                </Providers>
                <Toaster />
            </body>
        </html>
    );
}
