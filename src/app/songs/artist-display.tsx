import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import React from "react";

interface ArtistDisplayProps extends React.ComponentProps<'div'> {
    artists: string[]
}

export function ArtistDisplay({
    artists,
    className,
    ...props
}: ArtistDisplayProps) {
    return (
        <div className={className} {...props}>
            {artists[0]}
            {artists.length > 1 && (<>
                {", "}
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>{`+${artists.length - 1}`}</TooltipTrigger>
                        <TooltipContent className="max-w-64">
                            {artists.join(", ")}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </>)}
        </div>
    )
}