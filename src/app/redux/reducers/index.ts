import { ActionReducerMap } from '@ngrx/store';
import { ReviewState } from '@redux/state/review.state';
import { UserState } from '@redux/state/user.state';
import { reviewReduser } from './review.reducer';
import { userReduser } from './user.reduser';

export interface AppState {
  user: UserState;
  review: ReviewState
}

export const reducers: ActionReducerMap<AppState> = {
  user: userReduser,
  review: reviewReduser
};
