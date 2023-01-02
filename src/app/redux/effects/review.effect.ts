import { Injectable } from '@angular/core';
import { catchError, map, of, switchMap, mergeMap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ReviewApiService } from 'src/app/review/services/review-api.service';
import { ReviewInfo } from 'src/app/models/review.interface';
import { FileService } from 'src/app/review/services/file.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import * as ReviewActions from '../actions/review.actions';

@Injectable()
export class ReviewEffects {
  getReviews$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ReviewActions.GetReviews),
      switchMap(() =>
        this.reviewService.getAllReviews().pipe(
          map((reviews: ReviewInfo[]) => ReviewActions.GetReviewsSuccess({ reviews })),
          catchError((error) => of(ReviewActions.GetReviewsFailed({ error })))
        )
      )
    );
  });

  getReviewsTags$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ReviewActions.GetReviewsTags),
      switchMap(() =>
        this.reviewService
          .getAllReviewsTags()
          .pipe(map((tags: string[]) => ReviewActions.GetReviewsTagsSuccess({ tags })))
      )
    );
  });

  saveReview$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ReviewActions.SaveReview),
      switchMap(({ review, userId, file }) =>
        this.reviewService.createReview(userId, review).pipe(
          map((review: ReviewInfo) => ReviewActions.SaveReviewSuccess({ review, userId, file }))
          // catchError((error) => of(ReviewActions.GetReviewsFailed({ error }))),
        )
      )
    );
  });

  getFile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ReviewActions.GetFile),
      mergeMap(({ filePath, reviewId }) =>
        this.fileService.getReviewImage(filePath).pipe(
          map((filePath: SafeUrl) => ReviewActions.GetFileSuccess({ filePath, reviewId }))
          // catchError((error) => of(ReviewActions.GetReviewsFailed({ error }))),
        )
      )
    );
  });

  updateReview$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ReviewActions.UpdateReview),
      switchMap(({ review, reviewId }) =>
        this.reviewService.updateReview(review, reviewId).pipe(
          map((updatedReview: ReviewInfo) =>
            ReviewActions.UpdateReviewSuccess({
              review: updatedReview,
              reviewId,
            })
          ),
          catchError((error) => of(ReviewActions.UpdateReviewFailed({ error })))
        )
      )
    );
  });

  deleteReview$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ReviewActions.DeleteReview),
      mergeMap(({ id }) =>
        this.reviewService.deleteReview(id).pipe(
          map(() => ReviewActions.DeleteReviewSuccess({ id })),
          catchError((error) => of(ReviewActions.DeleteReviewFailed({ error })))
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private reviewService: ReviewApiService,
    private fileService: FileService,
    private sanitizer: DomSanitizer
  ) {}
}
