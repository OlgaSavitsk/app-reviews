import { HttpErrorResponse } from '@angular/common/http';
import { ReviewInfo } from 'src/app/models/review.interface';

export interface SearchReviewState {
  error: HttpErrorResponse | undefined;
  reviews: ReviewInfo[];
}

export const initialSearchReviewState: SearchReviewState = {
  reviews: [],
  error: undefined,
};
