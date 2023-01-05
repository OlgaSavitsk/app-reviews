import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { initialReviewState, ReviewState } from '@redux/state/review.state';
import { initialSearchReviewState, SearchReviewState } from '@redux/state/search.state';
import { initialUserState, UserState } from '@redux/state/user.state';
import { reviewReduser } from './review.reducer';
import { searchReviewReduser } from './search-review.reducer';
import { userReduser } from './user.reduser';

export interface AppState {
  user: UserState;
  review: ReviewState;
  searchReview: SearchReviewState;
}

export const initialAppState: AppState = {
  user: initialUserState,
  review: initialReviewState,
  searchReview: initialSearchReviewState,
};

export const reducers: ActionReducerMap<AppState> = {
  user: userReduser,
  review: reviewReduser,
  searchReview: searchReviewReduser,
};

export const metaReducers: MetaReducer<AppState>[] = [];
