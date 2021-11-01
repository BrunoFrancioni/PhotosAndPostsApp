import { ICreateUsers, ILoginUser } from '../interfaces/IUsers';
import API from '../utils/API/API';

class UsersService {
    private path: string = '/users';

    public async createUser(createUser: ICreateUsers) {
        return await API.post(this.path + '/signup', {
            createUser: createUser
        });
    }

    public async loginUser(loginUser: ILoginUser) {
        return await API.post(this.path + '/login', {
            loginUser: loginUser
        });
    }
}

export default UsersService;