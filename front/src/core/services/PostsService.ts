import API from '../utils/API/API';

class PostsService {
    private path: string = '/posts';

    public async getPosts(page: number = 1, size: number = 10) {
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

    public async getPostById(id: string) {
        return await API.get(this.path + `/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
    }
}

export default PostsService;