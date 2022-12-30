import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReviewState } from '@redux/state/review.state';
import { UserInfo } from 'src/app/models/user.interfaces';
import { UserState } from '../state/user.state';


export const getUserStore = createFeatureSelector<UserState>('user');

export const getCurrentUser = createSelector(
  getUserStore,
  (state: UserState) => state.user,
);

export const getIsFetched = createSelector(
  getUserStore,
  (state: UserState) => state.isFetched,
);

export const getUsers = createSelector(
  getUserStore,
  (state: UserState) => state.users,
);

export const selectUserById = (userId: string) =>
  createSelector(getUserStore, ({ users }) => {
    let userById = users.filter((user: UserInfo) => user.id === userId);
    if (userById.length === 0) {
      return null;
    }
    return userById[0];
  });

export const getLoading = createSelector(
  getUserStore,
  (state: UserState) => state.loading,
);

export const getReviewsStore = createFeatureSelector<ReviewState>('review');

export const getReviews = createSelector(
  getReviewsStore,
  (state: ReviewState) => state.reviews,
);

export const getLoadingReview = createSelector(
  getReviewsStore,
  (state: ReviewState) => state.loading,
);
