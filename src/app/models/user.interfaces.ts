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
  completed: boolean;
  roles: string;
  photos: {
    value: string
  }[]
}

export interface UserDetails {
  users: UserInfo[];
  completed: boolean;
}
