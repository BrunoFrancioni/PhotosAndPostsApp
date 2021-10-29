import API from "../../core/utils/API/API";
import {
    IGetPaginatePhotos,
    IGetPhotosById,
    IGetPhotosByIdResult,
    IGetPhotosResult, IPhoto
} from "../interfaces/IPhotos";

class PhotosController {
    private photos_URL: string = "photos";

    public async getPhotos(): Promise<IGetPhotosResult> {
        try {
            const apiResult = await API.get(this.photos_URL);

            let result: IGetPhotosResult;

            if (apiResult.status === 200) {
                let data: IPhoto[] = JSON.parse(JSON.stringify(apiResult.data));

                result = {
                    result: true,
                    photos: data,
                    totalResults: data.length
                }
            } else {
                result = {
                    result: false,
                    photos: null,
                    totalResults: null
                }
            }

            return result;
        } catch (e) {
            throw new Error(e);
        }
    }

    public async getPaginatePhotos(params: IGetPaginatePhotos): Promise<IGetPhotosResult> {
        try {
            const apiResult = await API.get(this.photos_URL);

            let result: IGetPhotosResult;

            if (apiResult.status === 200) {
                let data: IPhoto[] = JSON.parse(JSON.stringify(apiResult.data));

                let init = (params.page - 1);
                let end = ((init + params.size) > data.length - 1)
                    ? (data.length - 1) : (init + params.size);

                let sData: IPhoto[] = data.slice(init, end);

                result = {
                    result: true,
                    photos: sData,
                    totalResults: data.length
                }
            } else {
                result = {
                    result: false,
                    photos: null,
                    totalResults: null
                }
            }

            return result;
        } catch (e) {
            throw new Error(e);
        }
    }

    public async getPhotosById(params: IGetPhotosById): Promise<IGetPhotosByIdResult> {
        try {
            const apiResult = await API.get(this.photos_URL + `/${params.id}`);

            let result: IGetPhotosByIdResult;

            if (apiResult.status === 200) {
                let data: IPhoto = JSON.parse(JSON.stringify(apiResult.data));

                result = {
                    result: true,
                    photo: data
                }
            } else {
                result = {
                    result: false,
                    photo: null
                }
            }

            return result;
        } catch (e) {
            throw new Error(e);
        }
    }
}

export default PhotosController;