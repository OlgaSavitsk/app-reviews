import { createFeatureSelector, createSelector } from '@ngrx/store';

import { UserState } from '../state/custom.state';

export const getUserStore = createFeatureSelector<UserState>('user');

export const getCurrentUser = createSelector(
  getUserStore,
  (state: UserState) => state.user
);

export const getIsFetched = createSelector(
  getUserStore,
  (state: UserState) => state.isFetched
);
