'use client'

import Link from "next/link";
import hackernewsService, { Story } from "../../services/hackernews-service";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function StoryPage({ params }: { params: Promise<{ storyId: number }> }) {

    const { storyId } = use(params);
    const [story, setStory] = useState<Story | null>(null);

    const router = useRouter();

    useEffect(() => {
        hackernewsService.getStory(storyId)
        .then((story) => setStory(story));
    }, [])

    const epochToDate = (epoch: number) => {
        return new Date(epoch * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    }

    return (
        <div>

            { story && (
                <div>

                    <div className="flex flex-col gap-1">
                        { story.url && (
                            <Link
                                className="text-[#5f5f5f] hover:underline w-fit"
                                href={story.url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {story.url || ""}
                            </Link>
                        )}

                        <h1>
                            { story.title }
                        </h1>

                        <div className="flex gap-5 text-sm mb-2">
                            <time className="text-[gray]" dateTime={new Date(story.time * 1000).toISOString()}>
                                { epochToDate(story.time) }
                            </time>

                            <address className="text-[#d1a3ff]">
                                {story.by}
                            </address>

                            <div className="text-[#eed045]">
                                ★ {story.score}
                            </div>
                        </div>

                        <div className="max-w-[1000px]" dangerouslySetInnerHTML={{ __html: story.text}}></div>

                    </div>
                </div>
            )}
        </div>
    )
}

export default StoryPage;