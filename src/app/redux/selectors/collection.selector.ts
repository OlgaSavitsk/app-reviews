import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ReviewState } from '@redux/state/review.state';
import { SearchReviewState } from '@redux/state/search.state';
import { ReviewInfo } from 'src/app/models/review.interface';
import { UserInfo } from 'src/app/models/user.interfaces';
import { UserState } from '../state/user.state';

export const selectUserStore = createFeatureSelector<UserState>('user');

export const selectCurrentUser = createSelector(selectUserStore, (state: UserState) => state.user);

export const selectIsFetched = createSelector(
  selectUserStore,
  (state: UserState) => state.isFetched
);

export const selectUsers = createSelector(selectUserStore, (state: UserState) => state.users);

export const selectLoading = createSelector(selectUserStore, (state: UserState) => state.loading);

export const selectUserById = (userId: string) =>
  createSelector(selectUserStore, ({ users }) => {
    const userById = users.filter((user: UserInfo) => user.id === userId);
    return userById[0];
  });

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

export const selectReviewById = (reviewId: string) =>
  createSelector(selectReviewsStore, ({ reviews }) => {
    const reviewById = reviews.filter((review: ReviewInfo) => review.id === reviewId);
    return reviewById[0];
  });

export const selectReviewsByUserId = (userId: string) =>
  createSelector(selectReviewsStore, ({ reviews }) => {
    const reviewByUserId = reviews.filter((review: ReviewInfo) => review.userId === userId);
    return reviewByUserId;
  });

export const selectSearchReviewStore = createFeatureSelector<SearchReviewState>('searchReview');

export const selectCurrentSearchReview = createSelector(
  selectSearchReviewStore,
  (state: SearchReviewState) => state.reviews
);

export const selectSearchErrorReview = createSelector(
  selectSearchReviewStore,
  (state: SearchReviewState) => state.error
);
