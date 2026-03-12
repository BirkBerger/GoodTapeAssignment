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

const CACHE_KEY_PREFIX = 'story_';

class HackerNewsService {

    // Save storyIds locally to ensure fetching only once per session
    // - a reload should update top stories
    private storedIds: number[] = [];

    // Save every fetched story in local storage to improve performance
    private setCachedStory = (story: Story) => {
        localStorage.setItem(`${CACHE_KEY_PREFIX}${story.id}`, JSON.stringify(story))
    }

    private getCachedStory = (id: number) => {
        const raw = localStorage.getItem(`${CACHE_KEY_PREFIX}${id}`);
        return raw ? JSON.parse(raw) : null;
    }

    // Fetch IDs of top 500 stories
    private getStoryIds = async (): Promise<number[]> => {
        return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hackernews/topstories`)
        .then((res: Response) => res.json())
        .then((resJson) => {
            this.storedIds = resJson.data;
            return this.storedIds;
        })
        .catch((err) => {
            console.error(err);
            return [];
        })
    }

    // Fetch story by ID
    public getStory = async (id: number): Promise<Story> => {
        const cached = this.getCachedStory(id);
        if (cached) return cached;

        return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hackernews/item/?id=${id}`)
        .then((res) => res.json())
        .then((resJson) => {
            const story = resJson.data;
            this.setCachedStory(story);
            return story;
        })
        .catch((err) => {
            console.error(err);
            return [];
        })
    }

    // Fetch slice of top stories
    public getStories = async (idxStart: number, idxEnd: number): Promise<Story[]> => {
        const ids = this.storedIds.length > 0 ? this.storedIds : await this.getStoryIds();
        return Promise.all(ids.slice(idxStart, idxEnd).map((id) => this.getStory(id)));
    }

    public getComments = async (ids: number[]): Promise<Story[]> => {
        return Promise.all(ids.map((id) => this.getStory(id)));
    }

}

export default new HackerNewsService();