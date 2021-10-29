import { Request, Response } from "express";
import { verify } from "../middleware/auth";
import PostsController from "../controllers/PostsController";
import {
    IGetPaginatePosts,
    IGetPostById,
    IGetPostsByIdResult,
    IGetPostsResult
} from "../interfaces/IPosts";

class PostsRoutes {
    private postsController: PostsController = new PostsController();

    public routes(app: any): void {
        app.route('/posts')
            .get(verify,
                async (req: Request, res: Response) => {
                    try {
                        const params: IGetPaginatePosts = {
                            page: Number(req.query.page),
                            size: Number(req.query.size)
                        }

                        let result: IGetPostsResult;

                        if (!params.page && !params.size) {
                            result = await this.postsController.getPosts();
                        } else {
                            result = await this.postsController.getPaginatePosts(params);
                        }

                        if (result.result) {
                            return res.status(200).json({
                                posts: result.posts,
                                totalResults: result.totalResults
                            });
                        } else {
                            return res.status(500).json({
                                message: 'Server error'
                            });
                        }
                    } catch (e) {
                        return res.status(500).json({
                            message: 'Server error'
                        });
                    }
                });

        app.route('/posts/:id')
            .get(verify,
                async (req: Request, res: Response) => {
                    try {
                        const params: IGetPostById = {
                            id: Number(req.params.id)
                        }

                        if (!params.id) {
                            return res.status(400).json({
                                message: 'Post id must not be null'
                            });
                        }

                        let result: IGetPostsByIdResult = await this.postsController
                            .getPostById(params);

                        if (result.result) {
                            return res.status(200).json({
                                post: result.post
                            });
                        } else {
                            return res.status(500).json({
                                message: 'Server error'
                            });
                        }
                    } catch (e) {
                        return res.status(500).json({
                            message: 'Server error'
                        });
                    }
                });
    }
}

export default PostsRoutes;