import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, skip, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { ReviewInfo } from 'src/app/models/review.interface';
import { ReviewApiService } from 'src/app/review/services/review-api.service';
import * as SearchActions from '../actions/search-review.action';

@Injectable()
export class SearchReviewEffects {
  getSearchReviews$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SearchActions.GetSearchReviews),
      // skip(2),
      // map(({searchValue}) => (searchValue.length > 2 ? searchValue : '')),
      // debounceTime(700),
      // distinctUntilChanged(),
      mergeMap(({searchValue}) =>
        this.reviewService.getSearchReviews(searchValue).pipe(
          map((reviews: ReviewInfo[]) => SearchActions.GetSearchReviewsSuccess({ reviews })),
          catchError((error) => of(SearchActions.GetSearchReviewsFailed({ error })))
        )
      )
    );
  });

  constructor(private actions$: Actions, private reviewService: ReviewApiService) {}
}
