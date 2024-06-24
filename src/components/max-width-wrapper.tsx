import { cn } from "@/lib/utils";
import { ComponentProps, ReactNode } from "react";

interface MaxWidthWrapperProps extends ComponentProps<"div"> {
    children: ReactNode;
}

export default function MaxWidthWrapper({ className, ...props }: MaxWidthWrapperProps) {
    return <div className={cn("flex w-full flex-col items-center md:w-10/12 lg:w-9/12", className)} {...props} />;
}