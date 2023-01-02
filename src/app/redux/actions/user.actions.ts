import { createAction, props } from '@ngrx/store';
import { UserInfo } from 'src/app/models/user.interfaces';

const actionSource = '[User]';

export const FetchUser = createAction(`${actionSource} fetch user`);

export const FetchUserSuccess = createAction(
  `${actionSource} fetch user success`,
  props<{ user: UserInfo }>()
);

export const FetchUserFailed = createAction(
  `${actionSource} fetch user failed`,
  props<{ error: Error }>()
);

export const ClearData = createAction(`${actionSource} clear data`);

export const GetUsers = createAction(`${actionSource} get all users`);

export const GetUsersSuccess = createAction(
  `${actionSource} set fetched users`,
  props<{ users: UserInfo[] }>()
);

export const GetUsersFailed = createAction(
  `${actionSource} fetch users failed`,
  props<{ error: Error }>()
);

export const UpdateUser = createAction(
  `${actionSource} update user status`,
  props<{ user: UserInfo; status: UserInfo['status'] }>()
);

export const UpdateUserFailed = createAction(
  `${actionSource} update user failed`,
  props<{ error: Error }>()
);

export const UpdateUserSuccess = createAction(
  `${actionSource} update user status success`,
  props<{ user: UserInfo }>()
);

export const DeleteUser = createAction(`${actionSource} delete user`, props<{ id: string }>());

export const DeleteUserFailed = createAction(
  `${actionSource} delete user failed`,
  props<{ error: Error }>()
);

export const DeleteUserSuccess = createAction(
  `${actionSource} delete user success`,
  props<{ id: string }>()
);
