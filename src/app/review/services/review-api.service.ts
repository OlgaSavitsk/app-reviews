import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, map, finalize } from 'rxjs';

import { ReviewInfo } from 'src/app/models/review.interface';

@Injectable({
  providedIn: 'root',
})
export class ReviewApiService {
  constructor(private http: HttpClient, private spinner: NgxSpinnerService) {}

  getAllReviews(): Observable<ReviewInfo[]> {
    return this.http.get<ReviewInfo[]>('review', {
      withCredentials: true,
    });
  }

  getReviewsPaginate(page?: number, limit?: number) {
    this.spinner.show()
    return this.http.get(`review/paginate?page=${page}&limit=${limit}`, {
      withCredentials: true,
    })
    .pipe(
      finalize(() => this.spinner.hide())
  );
  }

  getAllReviewsTags(): Observable<string[]> {
    return this.http.get<string[]>('review/tags', {
      withCredentials: true,
    });
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

  getSearchReviews(searchValue: string): Observable<ReviewInfo[]> {
    return this.getSearchData(searchValue).pipe(map((reviews: ReviewInfo[]) => reviews));
  }

  private getSearchData(searchValue: string): Observable<ReviewInfo[]> {
    const params = new HttpParams().set('search', searchValue);
    return this.http.get<ReviewInfo[]>('review', { params });
  }
}
