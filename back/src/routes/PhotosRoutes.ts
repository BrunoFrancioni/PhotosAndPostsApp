import { Request, Response } from "express";
import { verify } from "../middleware/auth";
import PhotosController from "../controllers/PhotosController"
import { IGetPaginatePhotos, IGetPhotosById, IGetPhotosByIdResult, IGetPhotosResult } from "../interfaces/IPhotos";

class PhotosRoutes {
    private photosController: PhotosController = new PhotosController();

    public routes(app: any): void {
        app.route('/photos')
            .get(verify,
                async (req: Request, res: Response) => {
                    try {
                        const params: IGetPaginatePhotos = {
                            page: Number(req.query.page),
                            size: Number(req.query.size)
                        }

                        let result: IGetPhotosResult;

                        if (!params.page && !params.size) {
                            result = await this.photosController.getPhotos();
                        } else {
                            result = await this.photosController.getPaginatePhotos(params);
                        }

                        if (result.result) {
                            return res.status(200).json({
                                photos: result.photos,
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

        app.route('/photos/:id')
            .get(verify,
                async (req: Request, res: Response) => {
                    try {
                        const params: IGetPhotosById = {
                            id: Number(req.params.id)
                        }

                        if (!params.id) {
                            return res.status(400).json({
                                message: 'Post id must not be null'
                            });
                        }

                        let result: IGetPhotosByIdResult = await this.photosController
                            .getPhotosById(params);

                        if (result.result) {
                            return res.status(200).json({
                                photo: result.photo
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

export default PhotosRoutes