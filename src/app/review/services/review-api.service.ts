import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';

import { ReviewInfo } from 'src/app/models/review.interface';
import * as ReviewAction from '@redux/actions/review.actions';
import * as fromUser from '@redux/selectors/collection.selector';

@Injectable({
  providedIn: 'root',
})
export class ReviewApiService {

  constructor(
    private http: HttpClient,
    private store: Store,
  ) {}

  getAllReviews(): Observable<ReviewInfo[]> {
    return this.http.get<ReviewInfo[]>('review', {
      withCredentials: true,
    });
  }

  getCurrentReviews(): Observable<void[]> {
    return this.store.select(fromUser.getReviewsStore).pipe(
      map(({ reviews }) =>
        reviews.map((review) => {
          this.store.dispatch(
            ReviewAction.GetFile({
              filePath: review.filePath,
              reviewId: review.id,
            }),
          );
        }),
      ),
    );
  }

  getReviewById(id: string): Observable<ReviewInfo> {
    return this.http.get<ReviewInfo>(`review/${id}`, {
      withCredentials: true,
    });
  }

  createReview(userId: string, payload: FormData): Observable<ReviewInfo> {
    return this.http.post<ReviewInfo>(`review/${userId}`, payload);
  }

  updateReview(review: FormData, reviewId: string): Observable<ReviewInfo> {
    return this.http.put<ReviewInfo>(`review/${reviewId}`, review, {
      withCredentials: true,
    });
  }

  deleteReview(id: string): Observable<ReviewInfo[]> {
    return this.http.delete<ReviewInfo[]>(`review/${id}`, {
      withCredentials: true,
    });
  }
}
