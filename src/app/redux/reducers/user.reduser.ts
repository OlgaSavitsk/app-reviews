import { createReducer, on } from '@ngrx/store';

import {
  ClearData,
  DeleteUser,
  DeleteUserSuccess,
  FetchUser,
  FetchUserFailed,
  FetchUserSuccess,
  GetUsers,
  GetUsersFailed,
  GetUsersSuccess,
  UpdateUser,
  UpdateUserFailed,
  UpdateUserSuccess,
} from '../actions/user.actions';
import { initialUserState } from '../state/custom.state';

export const userReduser = createReducer(
  initialUserState,
  on(FetchUser, (state) => ({
    ...state,
  })),
  on(FetchUserSuccess, (state, { user }) => ({
    ...state,
    user,
    isFetched: true,
  })),
  on(FetchUserFailed, (state, { error }) => ({
    ...state,
    isFetched: true,
    error,
  })),
  on(GetUsers, (state) => ({
    ...state,
    loading: true,
  })),
  on(GetUsersSuccess, (state, { users }) => {
    console.log('!!!!!');
    return {
      ...state,
      users,
      loading: false,
    };
  }),
  on(GetUsersFailed, (state, { error }) => ({
    ...state,
    isFetched: true,
    loading: false,
    error,
  })),
  on(UpdateUser, (state) => ({
    ...state,
  })),
  on(UpdateUserSuccess, (state, { user }) => ({
    ...state,
    users: state.users.map((oldUser) =>
      oldUser.id === user.id ? user : oldUser,
    ),
  })),
  on(UpdateUserFailed, (state, { error }) => ({
    ...state,
    isFetched: true,
    loading: false,
    error,
  })),
  on(DeleteUser, (state) => ({
    ...state,
  })),
  on(DeleteUserSuccess, (state, { id }) => ({
    ...state,
    users: state.users.filter((user) => user.id !== id),
  })),
  on(ClearData, (state) => ({
    ...state,
    user: null,
  })),
);
