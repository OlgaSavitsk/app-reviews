import { UserInfo } from 'src/app/models/user.interfaces';

export interface UserState {
  user: UserInfo | null;
  users: UserInfo[];
  isFetched: boolean;
  loading: boolean;
  isUpdated: boolean;
}

export const initialUserState: UserState = {
  user: null,
  users: [],
  isFetched: false,
  loading: false,
  isUpdated: false,
};
