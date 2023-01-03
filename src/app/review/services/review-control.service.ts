import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromUser from '@redux/selectors/collection.selector';
import { map, Observable, tap } from 'rxjs';
import { ReviewInfo } from 'src/app/models/review.interface';
import * as ReviewAction from '@redux/actions/review.actions';
import { FileService } from './file.service';

@Injectable({
  providedIn: 'root',
})
export class ReviewControlService {
  reviewForm!: FormGroup;
  image: any;
  ratingValue!: number;

  set rating(value: number) {
    this.ratingValue = value;
  }

  get rating(): number {
    return this.ratingValue;
  }
  constructor(private store: Store, private fileService: FileService) {}

  addRating(dialogData: ReviewInfo) {
    this.fileService.getReviewFile(dialogData.filePath).subscribe((file) => {
      const reviewFormData = this.prepeareFormData(dialogData, file);
      this.store.dispatch(
        ReviewAction.UpdateReview({
          review: reviewFormData,
          reviewId: dialogData.id,
        })
      );
    });
  }

  setRating(dialogData: ReviewInfo): ReviewInfo {
    return { ...dialogData, rating: this.ratingValue };
  }

  prepeareFormData(dialogData: ReviewInfo, file: File) {
    const formData = new FormData();
    const review = this.setRating(dialogData);
    formData.set('image', file);
    formData.set('review', JSON.stringify(review));
    return formData;
  }

  getAllTags(): Observable<string[]> {
    return this.store.select(fromUser.selectTags).pipe(map((tags) => tags));
  }

  getRatingOfArt(name: string) {
    return this.store
      .select(fromUser.selectReviewsStore)
      .pipe(map(({ reviews }) => reviews.filter((review) => review.name === name)));
  }
}
