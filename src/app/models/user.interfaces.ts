export interface UserAuth {
  username: string;
  login: string;
  password: string;
  status?: string;
  role: string[];
}

export interface UserInfo {
  id: string;
  login: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  completed: boolean;
  role: string[];
}

export interface UserDetails {
  users: UserInfo[];
  completed: boolean;
}
