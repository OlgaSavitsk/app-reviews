import { UserInfo } from "src/app/models/user.interfaces";

export interface LoginRequestModel {
    username: string;
    password: string;
}

export interface RegisterRequestModel extends LoginRequestModel {
    login: string;
}

export interface AuthResponseModel {
    user: UserInfo
}