import { ActionReducerMap } from '@ngrx/store';
import { ReviewState } from '@redux/state/review.state';
import { SearchReviewState } from '@redux/state/search.state';
import { UserState } from '@redux/state/user.state';
import { reviewReduser } from './review.reducer';
import { searchReviewReduser } from './search-review.reducer';
import { userReduser, userReviewReduser } from './user.reduser';

export interface AppState {
  user: UserState;
  review: ReviewState;
  userReviewReduser: UserState;
  searchReview: SearchReviewState;
}

export const reducers: ActionReducerMap<AppState> = {
  user: userReduser,
  review: reviewReduser,
  userReviewReduser,
  searchReview: searchReviewReduser,
};
