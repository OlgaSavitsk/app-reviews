import { ReviewInfo } from "src/app/models/review.interface";

export interface ReviewState {
  reviews: ReviewInfo[];
  loading: boolean;
}

export const initialReviewState: ReviewState = {
  reviews: [],
  loading: false,
};