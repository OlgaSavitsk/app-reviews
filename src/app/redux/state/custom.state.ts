import { UserInfo } from "src/app/models/user.interfaces";

export interface UserState {
  user: UserInfo | null;
  isFetched: boolean;
}

export const initialUserState: UserState = {
  user: null,
  isFetched: false,
};
