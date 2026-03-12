'use client'

import { useEffect, useState } from "react";
import hackernewsService, { Story } from '../services/hackernews-service';
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

function PartTwo() {

    const [stories, setStories] = useState<Story[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    const pathname = usePathname();
    const linkClasses = "hover:underline  wrap-break-word"

    useEffect(() => {
        hackernewsService.getStories(20)
        .then((stories) => setStories(stories))
        .finally(() => setIsInitialized(true));
    }, [])

    return (
        <div>
            Stories!
        </div>
    )

}

export default PartTwo;
