import { createReducer, on } from '@ngrx/store';
import {
  GetSearchReviews,
  GetSearchReviewsFailed,
  GetSearchReviewsSuccess,
} from '@redux/actions/search-review.action';
import { initialSearchReviewState, SearchReviewState } from '@redux/state/search.state';

export const searchReviewReduser = createReducer<SearchReviewState>(
  initialSearchReviewState,
  on(
    GetSearchReviews,
    (state): SearchReviewState => ({
      ...state,
    })
  ),
  on(
    GetSearchReviewsSuccess,
    (state, { reviews }): SearchReviewState => ({
      ...state,
      reviews,
    })
  ),
  on(GetSearchReviewsFailed, (state, { error }) => ({
    ...state,
    error,
  }))
);
