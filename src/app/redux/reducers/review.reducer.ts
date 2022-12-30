import { createReducer, on } from '@ngrx/store';
import { initialReviewState } from '@redux/state/review.state';
import { initialUserState } from '@redux/state/user.state';

import {
  DeleteReview,
  DeleteReviewSuccess,
  GetReviews,
  GetReviewsFailed,
  GetReviewsSuccess,
  SaveReview,
  SaveReviewSuccess,
  UpdateReview,
  UpdateReviewFailed,
  UpdateReviewSuccess,
} from '../actions/review.actions';

export const reviewReduser = createReducer(
  initialReviewState,
  on(GetReviews, (state) => ({
    ...state,
    loading: true,
  })),
  on(GetReviewsSuccess, (state, { reviews }) => ({
    ...state,
    reviews,
    loading: false,
  })),
  on(GetReviewsFailed, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  
  on(UpdateReview, (state) => ({
    ...state,
  })),
  on(UpdateReviewFailed, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(DeleteReview, (state) => ({
    ...state,
  })),
  on(DeleteReviewSuccess, (state, { id }) => ({
    ...state,
   // reviews: state.reviews.filter((review) => review.id !== id),
  })),
);
