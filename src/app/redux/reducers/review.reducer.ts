import { createReducer, on } from '@ngrx/store';
import { initialReviewState, ReviewState } from '@redux/state/review.state';

import {
  GetReviews,
  GetReviewsFailed,
  GetReviewsSuccess,
  GetReviewsTagsSuccess,
} from '../actions/review.actions';

export const reviewReduser = createReducer<ReviewState>(
  initialReviewState,
  on(
    GetReviews,
    (state): ReviewState => ({
      ...state,
      loading: true,
    })
  ),
  on(
    GetReviewsSuccess,
    (state, { reviews }): ReviewState => ({
      ...state,
      reviews,
      loading: false,
    })
  ),
  on(GetReviewsFailed, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(
    GetReviewsTagsSuccess,
    (state, { tags }): ReviewState => ({
      ...state,
      tags,
      loading: false,
    })
  )
);
