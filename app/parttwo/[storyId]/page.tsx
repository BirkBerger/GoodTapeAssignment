'use client'

import Link from "next/link";
import hackernewsService, { Story } from "../../services/hackernews-service";
import { use, useEffect, useState } from "react";

function StoryPage({ params }: { params: Promise<{ storyId: number }> }) {

    const { storyId } = use(params);
    const [story, setStory] = useState<Story | null>(null);
    const [comments, setComments] = useState<Story[]>([]);
    const [commentsLoaded, setCommentsLoaded] = useState(false);

    useEffect(() => {
        hackernewsService.getStory(storyId)
        .then((story) => setStory(story));
    }, [])

    useEffect(() => {
        const stories = story?.kids ? story.kids.slice(0, 3) : [];
        hackernewsService.getComments(stories)
        .then((newComments) => setComments(newComments))
        .finally(() => setCommentsLoaded(true));
    }, [story?.id])

    const epochToDate = (epoch: number) => {
        return new Date(epoch * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
    }

    const loadMoreComments = () => {
        if (!story || !story.kids) return;
        hackernewsService.getComments(story.kids.slice(comments.length, comments.length + 3))
        .then((newComments) => setComments([...comments, ...newComments]));
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

            <hr className="border-t border-gray-300 my-4" />

            { story && commentsLoaded && (
                <div className="text-sm">Comments ({story.kids ? story.kids.length : 0})</div>
            )}

            { comments.map((comment, idx) => (
                <div className="text-sm my-5 bg-[#e6e5e5] p-4 rounded-2xl" key={`comment_${idx}`}>

                    <div className="flex text-[gray] gap-2">
                        { !comment.deleted && (
                            <address>
                                {comment.by} •
                            </address>
                        )}
                        
                        { comment.deleted && (
                            <span>
                                Comment deleted •
                            </span>
                        )}

                        <time dateTime={new Date(comment.time * 1000).toISOString()}>
                            { epochToDate(comment.time) }
                        </time>
                    </div>
                    
                    <div className="overflow-auto" dangerouslySetInnerHTML={{ __html: comment.text}}></div>
                </div>
            ))}

            { commentsLoaded && comments.length > 0 && story && story.kids && comments.length < story.kids.length && (
                <div className="flex justify-center">
                    <button 
                        className="w-fit font-bold text-[#9225ff] hover:text-[#6f25b9] cursor-pointer flex gap-2 items-center"
                        onClick={() => loadMoreComments()}
                        >
                        <div className="rotate-90">▶</div>
                        Show more
                    </button>
                </div>
            )}
        </div>
    )
}

export default StoryPage;