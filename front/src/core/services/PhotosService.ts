import API from '../utils/API/API';

class PhotosService {
    private path: string = '/photos';

    public async getPhotos(page: number = 1, size: number = 10) {
        return await API.get(this.path, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            params: {
                page: page,
                size: size
            }
        });
    }

    public async getPhotosById(id: string) {
        return await API.get(this.path + `/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
    }
}

export default PhotosService;