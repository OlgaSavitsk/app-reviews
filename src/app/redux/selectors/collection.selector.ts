import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReviewState } from '@redux/state/review.state';
import { UserInfo } from 'src/app/models/user.interfaces';
import { UserState } from '../state/user.state';

export const selectUserStore = createFeatureSelector<UserState>('user');

export const selectCurrentUser = createSelector(selectUserStore, (state: UserState) => state.user);

export const selectIsFetched = createSelector(
  selectUserStore,
  (state: UserState) => state.isFetched
);

export const selectUsers = createSelector(selectUserStore, (state: UserState) => state.users);

export const selectUserById = (userId: string) =>
  createSelector(selectUserStore, ({ users }) => {
    const userById = users.filter((user: UserInfo) => user.id === userId);
    if (userById.length === 0) {
      return null;
    }
    return userById[0];
  });

export const selectLoading = createSelector(selectUserStore, (state: UserState) => state.loading);

export const selectReviewsStore = createFeatureSelector<ReviewState>('review');

export const selectReviews = createSelector(
  selectReviewsStore,
  (state: ReviewState) => state.reviews
);

export const selectTags = createSelector(selectReviewsStore, (state: ReviewState) => state.tags);

export const selectLoadingReview = createSelector(
  selectReviewsStore,
  (state: ReviewState) => state.loading
);
