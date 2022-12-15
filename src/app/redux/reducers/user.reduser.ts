import { createReducer, on } from '@ngrx/store';

import {
  ClearData,
  FetchUser,
  FetchUserFailed,
  FetchUserSuccess,
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
  on(ClearData, (state) => ({
    ...state,
    user: null,
  })),
);
