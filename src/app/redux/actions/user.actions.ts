import { createAction, props } from '@ngrx/store';
import { UserInfo } from 'src/app/models/user.interfaces';

const actionSource = '[User]';

export const FetchUser = createAction(`${actionSource} fetch user`);

export const FetchUserSuccess = createAction(
  `${actionSource} fetch user success`,
  props<{ user: UserInfo }>(),
);

export const FetchUserFailed = createAction(
  `${actionSource} fetch user failed`,
  props<{ error: any }>(),
);

export const ClearData = createAction(
  `${actionSource} clear data`
)
