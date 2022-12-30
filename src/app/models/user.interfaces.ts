import { ReviewInfo } from "./review.interface";

export interface UserAuth {
  username: string;
  login: string;
  password: string;
  status?: string;
  roles: string;
}

export interface UserInfo {
  id: string;
  login: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  roles: string;
  photos: {
    value: string
  }[];
  reviews: ReviewInfo[]
}

export interface UserDetails {
  users: UserInfo[];
}
