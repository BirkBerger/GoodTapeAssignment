import { NextRequest, NextResponse } from "next/server";

const HACKER_NEWS_BASE_URL = "https://hacker-news.firebaseio.com/v0";

// Get story via ID
export async function GET(req: NextRequest): Promise<NextResponse<{ message: string, status: number, data: any }>> {
    try {
        const id = req.nextUrl.searchParams.get('id');
        const data = await fetch(`${HACKER_NEWS_BASE_URL}/item/${id}.json?print=pretty`, {
            method: 'GET'
        })
        .then((res) => res.json());
        return NextResponse.json({ message: "Successfully retrieved Hacker News story.", status: 200, data })
    } catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Failed to retrieve Hacker News story.", status: 400, data: null })
    }
}