export interface IUser {
    _id: string;
    name_lastname: string;
    email: string;
}

export interface ICreateUsers {
    name_lastname: string;
    email: string;
    password: string;
}

export interface ILoginUser {
    email: string;
    password: string;
}

export interface ILoginResult {
    result: boolean;
    token: string;
    user: IUser;
}