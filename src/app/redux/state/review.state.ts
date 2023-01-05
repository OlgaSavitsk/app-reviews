import { ReviewInfo } from 'src/app/models/review.interface';

export interface ReviewState {
  reviews: ReviewInfo[];
  tags: string[];
  // userId: string,
  loading: boolean;
}

export const initialReviewState: ReviewState = {
  reviews: [],
  tags: [],
  // userId: '',
  loading: false,
};
