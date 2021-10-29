import API from "../../core/utils/API/API";
import {
    IGetPaginatePosts,
    IGetPostById,
    IGetPostsByIdResult,
    IGetPostsResult,
    IPost
} from "../interfaces/IPosts";

class PostsController {
    private posts_URL: string = "posts";

    public async getPosts(): Promise<IGetPostsResult> {
        try {
            const apiResult = await API.get(this.posts_URL);

            let result: IGetPostsResult;

            if (apiResult.status === 200) {
                let data: IPost[] = JSON.parse(JSON.stringify(apiResult.data));

                result = {
                    result: true,
                    posts: data,
                    totalResults: data.length
                }
            } else {
                result = {
                    result: false,
                    posts: null,
                    totalResults: null
                }
            }

            return result;
        } catch (e) {
            throw new Error(e);
        }
    }

    public async getPaginatePosts(params: IGetPaginatePosts): Promise<IGetPostsResult> {
        try {
            const apiResult = await API.get(this.posts_URL);

            let result: IGetPostsResult;

            if (apiResult.status === 200) {
                let data: IPost[] = JSON.parse(JSON.stringify(apiResult.data));

                let init = (params.page - 1);
                let end = ((init + params.size) > data.length - 1)
                    ? (data.length - 1) : (init + params.size);

                let sData: IPost[] = data.slice(init, end);

                result = {
                    result: true,
                    posts: sData,
                    totalResults: data.length
                }
            } else {
                result = {
                    result: false,
                    posts: null,
                    totalResults: null
                }
            }

            return result;
        } catch (e) {
            throw new Error(e);
        }
    }

    public async getPostById(params: IGetPostById): Promise<IGetPostsByIdResult> {
        try {
            const apiResult = await API.get(this.posts_URL + `/${params.id}`);

            let result: IGetPostsByIdResult;

            if (apiResult.status === 200) {
                let data: IPost = JSON.parse(JSON.stringify(apiResult.data));

                result = {
                    result: true,
                    post: data
                }
            } else {
                result = {
                    result: false,
                    post: null
                }
            }

            return result;
        } catch (e) {
            throw new Error(e);
        }
    }
}

export default PostsController;