import { Injectable } from '@angular/core';
import { catchError, map, of, switchMap, mergeMap, tap, withLatestFrom } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ReviewActions from '../actions/review.actions';
import { ReviewApiService } from 'src/app/review/services/review-api.service';
import { ReviewInfo } from 'src/app/models/review.interface';
import { FileService } from 'src/app/review/services/file.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Injectable()
export class ReviewEffects {
  getReviews$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReviewActions.GetReviews),
      switchMap(() =>
        this.reviewService.getAllReviews().pipe(
          map((reviews: ReviewInfo[]) =>
            ReviewActions.GetReviewsSuccess({ reviews }),
          ),
          catchError((error) => of(ReviewActions.GetReviewsFailed({ error }))),
        ),
      ),
    ),
  );

  saveReview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReviewActions.SaveReview),
      switchMap(({ review, userId, file }) =>
        this.reviewService.createReview(userId, review).pipe(
          map((review: ReviewInfo) =>
            ReviewActions.SaveReviewSuccess({ review, userId, file }),
          ),
          // catchError((error) => of(ReviewActions.GetReviewsFailed({ error }))),
        ),
      ),
    ),
  );

  getFile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReviewActions.GetFile),
      mergeMap(({ filePath, reviewId }) =>
        this.fileService.getReviewImage(filePath).pipe(
         map((filePath: SafeUrl) => ReviewActions.GetFileSuccess({ filePath , reviewId})),
          // catchError((error) => of(ReviewActions.GetReviewsFailed({ error }))),
        ),
      ),
    ),
  );

  updateReview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReviewActions.UpdateReview),
      switchMap(({ review, reviewId }) =>
        this.reviewService.updateReview(review, reviewId).pipe(
          map((updatedReview: ReviewInfo) =>
            ReviewActions.UpdateReviewSuccess({ review: updatedReview, reviewId }),
          ),
          catchError((error) =>
            of(ReviewActions.UpdateReviewFailed({ error })),
          ),
        ),
      ),
    ),
  );

  deleteReview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReviewActions.DeleteReview),
      mergeMap(({ id }) =>
        this.reviewService.deleteReview(id).pipe(
          map(() => ReviewActions.DeleteReviewSuccess({ id: id })),
          catchError((error) =>
            of(ReviewActions.DeleteReviewFailed({ error })),
          ),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private reviewService: ReviewApiService,
    private fileService: FileService,
    private sanitizer: DomSanitizer,
  ) {}
}
