export interface Story {
    id: string;
    by: string;
    kids?: number[];
    time: number;
    title: string;
    score: number;
    descendants: number;
    text: string;
    url: string;
    deleted: boolean;
}

class HackerNewsService {

    private getStoryIds = async (limit: number): Promise<number[]> => {
        return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hackernews/topstories`)
        .then((res: Response) => res.json())
        .then((resJson) => resJson.data.slice(0, limit))
        .catch((err) => {
            console.error(err);
            return [];
        })
    }

    private getStory = async (id: number): Promise<Story> => {
        return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hackernews/item/?id=${id}`)
        .then((res) => res.json())
        .then((resJson) => resJson.data)
        .catch((err) => {
            console.error(err);
            return [];
        })
    }

    public getStories = async (limit: number): Promise<Story[]> => {
        const ids = await this.getStoryIds(limit);
        return Promise.all(ids.map((id) => this.getStory(id)));
    }

}

export default new HackerNewsService();