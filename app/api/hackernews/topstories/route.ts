import { NextRequest, NextResponse } from "next/server";

const HACKER_NEWS_BASE_URL = "https://hacker-news.firebaseio.com/v0";

// Get top 500 stories
export async function GET(): Promise<NextResponse<{ message: string, status: number, data: any }>> {
    try {
        const data = await fetch(`${HACKER_NEWS_BASE_URL}/topstories.json?print=pretty`, {
            method: 'GET'
        })
        .then((res) => res.json());
        return NextResponse.json({ message: "Successfully retrieved IDs of the top 500 Hacker News stories.", status: 200, data })
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Failed to retrieve IDs of the top 500 Hacker News stories.", status: 400, data: null });
    }
}