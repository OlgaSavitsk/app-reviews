import { ReviewInfo } from "src/app/models/review.interface";

export interface SearchReviewState {
    reviews: ReviewInfo[]
  }
  
  export const initialSearchReviewState: SearchReviewState = {
    reviews: []
  };