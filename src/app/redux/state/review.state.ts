import { ReviewInfo } from 'src/app/models/review.interface';

export interface ReviewState {
  reviews: ReviewInfo[];
  tags: string[];
  loading: boolean;
}

export const initialReviewState: ReviewState = {
  reviews: [],
  tags: [],
  loading: false,
};
