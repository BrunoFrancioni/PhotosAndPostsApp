import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPost } from "../../interfaces/IPosts";

interface PostsState {
    posts: IPost[];
    totalResults: number;
    actualPage: number;
}

interface InteractPosts {
    posts: IPost[];
}

interface InteractTotalResults {
    totalResults: number;
}

interface InteractActualPage {
    actualPage: number;
}

const initialState: PostsState = {
    posts: [],
    totalResults: 0,
    actualPage: 1
}

export const postsSlice = createSlice({
    name: 'posts',
    initialState: initialState,
    reducers: {
        setPosts: (state: PostsState,  action: PayloadAction<InteractPosts>) => {
            state.posts = action.payload.posts;
        },
        changeTotalResults: (state: PostsState, action: PayloadAction<InteractTotalResults>) => {
            state.totalResults = action.payload.totalResults
        },
        changeActualPage: (state: PostsState, action: PayloadAction<InteractActualPage>) => {
            state.actualPage = action.payload.actualPage
        },
    }
});

export const {
    actions: {
        setPosts: setPostsAction,
        changeTotalResults: changeTotalResultsAction,
        changeActualPage: changeActualPageAction
    }
} = postsSlice;