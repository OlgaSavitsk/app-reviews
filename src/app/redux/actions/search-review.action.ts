import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { ReviewInfo } from 'src/app/models/review.interface';

const actionSource = '[Search]';

export const GetSearchReviews = createAction(
  `${actionSource} get search reviews`,
  props<{ searchValue: string }>()
);

export const GetSearchReviewsSuccess = createAction(
  `${actionSource} set search reviews`,
  props<{ reviews: ReviewInfo[] }>()
);

export const GetSearchReviewsFailed = createAction(
  `${actionSource} search reviews failed`,
  props<{ error: HttpErrorResponse }>()
);
