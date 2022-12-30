import { SafeUrl } from '@angular/platform-browser';
import { createAction, props } from '@ngrx/store';
import { ReviewInfo } from 'src/app/models/review.interface';

const actionSource = '[Review]';

export const GetReviews = createAction(`${actionSource} get all reviews`);

export const GetReviewsSuccess = createAction(
  `${actionSource} set fetched reviews`,
  props<{ reviews: ReviewInfo[] }>(),
);

export const GetReviewsFailed = createAction(
  `${actionSource} fetch reviews failed`,
  props<{ error: Error }>(),
);

export const SaveReview = createAction(
  `${actionSource} save new review`,
  props<{ review: FormData, userId: string, file: File }>(),
);

export const SaveReviewSuccess = createAction(
  `${actionSource} save new review success`,
  props<{ review: ReviewInfo, userId: string, file: File }>(),
);

export const UpdateReview = createAction(
  `${actionSource} update review`,
  props<{ review: FormData, reviewId: string }>(),
);

export const UpdateReviewFailed = createAction(
  `${actionSource} update user failed`,
  props<{ error: Error }>(),
);

export const UpdateReviewSuccess = createAction(
  `${actionSource} update review success`,
  props<{ review: ReviewInfo, reviewId: string }>(),
);

export const GetFile = createAction(
  `${actionSource} get file`,
  props<{ filePath: string, reviewId: string }>(),
);

export const GetFileSuccess = createAction(
  `${actionSource} get file success`,
  props<{ filePath: SafeUrl, reviewId: string }>(),
);

export const SetFile = createAction(
  `${actionSource} set file`,
  props<{ file: File , reviewId: string}>(),
);

export const SetFileSuccess = createAction(
  `${actionSource} set file success`,
  props<{ file: File, reviewId: string }>(),
);

export const DeleteReview = createAction(
  `${actionSource} delete review`,
  props<{ id: string }>(),
);

export const DeleteReviewFailed = createAction(
  `${actionSource} delete review failed`,
  props<{ error: Error }>(),
);

export const DeleteReviewSuccess = createAction(
  `${actionSource} delete review success`,
  props<{ id: string }>(),
);
