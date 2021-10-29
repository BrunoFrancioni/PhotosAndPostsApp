export interface IPost {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export interface IGetPostsResult {
    result: boolean;
    posts: IPost[] | null;
    totalResults: number | null;
}

export interface IGetPaginatePosts {
    page: number;
    size: number;
}

export interface IGetPostById {
    id: number;
}

export interface IGetPostsByIdResult {
    result: boolean;
    post: IPost | null;
}