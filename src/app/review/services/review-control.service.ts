import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';

import { ReviewInfo, ReviewUpdate } from 'src/app/models/review.interface';
import * as fromUser from '@redux/selectors/collection.selector';
import * as ReviewAction from '@redux/actions/review.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { UserInfo } from 'src/app/models/user.interfaces';
import { FileService } from './file.service';

@Injectable({
  providedIn: 'root',
})
export class ReviewControlService {
  ratingValue!: number;

  set rating(value: number) {
    this.ratingValue = value;
  }

  get rating(): number {
    return this.ratingValue;
  }

  constructor(private store: Store, private fileService: FileService) {}

  addRating(dialogData: ReviewInfo, data: ReviewUpdate) {
    this.fileService.getReviewFile(dialogData.filePath).subscribe((file) => {
      const reviewFormData = this.prepeareFormData(dialogData, file, data);
      this.store.dispatch(
        ReviewAction.UpdateReview({
          review: reviewFormData,
          reviewId: dialogData.id,
        })
      );
    });
  }

  setRating(dialogData: ReviewInfo, { rating, likedUser, likes }: ReviewUpdate): ReviewInfo {
    return {
      ...dialogData,
      likes: likes,
      likedUser: likedUser
        ? dialogData.likedUser.filter((userId) => userId === likedUser)
        : [...(dialogData?.likedUser ?? []), likedUser],
      rating: [...(dialogData?.rating ?? []), rating],
    };
  }

  prepeareFormData(dialogData: ReviewInfo, file: File, data: ReviewUpdate) {
    const formData = new FormData();
    const review = this.setRating(dialogData, data);
    formData.set('image', file);
    formData.set('review', JSON.stringify(review));
    return formData;
  }

  getAllReviews(): Observable<ReviewInfo[]> {
    return this.store.select(fromUser.selectReviewsStore).pipe(map(({ reviews }) => reviews));
  }

  getReviews(): Observable<ReviewInfo[]> {
    return this.store.select(fromUser.selectReviewsStore).pipe(map(({ reviews }) => reviews));
  }

  getAllTags(): Observable<string[]> {
    return this.store.select(fromUser.selectTags).pipe(map((tags) => tags));
  }

  getRatingOfArt(name: string) {
    return this.store
      .select(fromUser.selectReviewsStore)
      .pipe(map(({ reviews }) => reviews.filter((review) => review.name === name)));
  }

  getSearchReview(): Observable<ReviewInfo[]> {
    return this.store.select(fromUser.selectSearchReviewStore).pipe(map(({ reviews }) => reviews));
  }

  getErrorSearchReview(): Observable<HttpErrorResponse | undefined> {
    return this.store.select(fromUser.selectSearchErrorReview).pipe(map((error) => error));
  }

  getUserById(userId: string): Observable<UserInfo> {
    return this.store.select(fromUser.selectUserById(userId)).pipe(map((user) => user));
  }
}
