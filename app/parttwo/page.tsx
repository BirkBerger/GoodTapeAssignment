'use client'

import { useEffect, useState } from "react";
import hackernewsService, { Story } from '../services/hackernews-service';
import Link from "next/link";
import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function PartTwo() {

    const [stories, setStories] = useState<Story[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    const pageLimit = 20;
    const storyLimit = 500;
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const linkClasses = "hover:underline wrap-anywhere w-fit"

    const listIdx = Number(searchParams.get("listIdx") ?? 0);

    useEffect(() => {
        setIsInitialized(false);
        hackernewsService.getStories(listIdx, listIdx + pageLimit)
        .then((stories) => setStories(stories))
        .finally(() => setIsInitialized(true));
    }, [listIdx])

    function goToList(idx: number) {
        router.push(`${pathname}?listIdx=${idx}`)
    }

    return (
        <div>
            { isInitialized && (
                <div>
                    <div className="grid grid-cols-[auto_3fr_1fr] cursor-default">
                        { stories.map((story, idx) => (
                            <React.Fragment key={`story_${idx}`}>

                                <div className="flex items-center row-span-2 text-[gray] pr-4">
                                    {(listIdx * 20) + idx + 1}
                                </div>

                                <Link
                                    className={linkClasses}
                                    href={`${pathname}/${story.id}`}
                                    >
                                    <h3>
                                        {story.title}
                                    </h3>
                                </Link>

                                <div>
                                    <address className="justify-self-end text-sm pr-[2px]">
                                        {story.by}
                                    </address>
                                </div>

                                <Link
                                    className={`${linkClasses} text-[#9225ff] text-sm`}
                                    href={story?.url || ""}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {story.url || ""}
                                </Link>

                                <div className="text-right text-[#d1a3ff]">
                                    ★ {story.score || 0}
                                </div>

                                { idx < pageLimit - 1  && (
                                    <hr className="col-span-3 border-t border-gray-300 my-2" />
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    <div className="mt-5 flex justify-end">

                        { (listIdx > 0) && (
                            <div
                            className="mr-auto flex items-center gap-2 w-fit font-bold text-[#9225ff] hover:text-[#6f25b9] cursor-pointer"
                            onClick={() => goToList(listIdx - 1)}
                            >
                                <span className="rotate-180 mb-[1px]">
                                    ▶
                                </span>
                                Previous
                            </div>
                        )}

                        { (listIdx + pageLimit < storyLimit) && (
                            <div
                            className="flex items-center gap-2 w-fit font-bold text-[#9225ff] hover:text-[#6f25b9] cursor-pointer"
                            onClick={() => goToList(listIdx + 1)}
                            >
                                Next
                                <span className="mt-[3px]">
                                    ▶
                                </span>
                            </div>
                        )}

                        { (listIdx + pageLimit >= storyLimit) && (
                            <div 
                                className="flex items-center gap-2 w-fit font-bold text-[#646464] cursor-default">
                                There are no more stories
                            </div>
                        )}
                    </div>
                </div>
            )}
            { !isInitialized && (
                <div className="text-[#9225ff]">
                    Fetching top stories...
                </div>
            )}
        </div>
    )

}

export default PartTwo;
