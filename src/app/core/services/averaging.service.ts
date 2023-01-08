import { Injectable } from '@angular/core';
import { ReviewInfo } from 'src/app/models/review.interface';

@Injectable({
  providedIn: 'root',
})
export class AveragingService {

  averaging(reviews: ReviewInfo[], value: string): number {
    const totalRating = reviews.map((review) => review[value]).filter(Boolean);
    const sumRating = totalRating.reduce((acc, rate) => acc + rate, 0);
    const averageValue = +(sumRating / totalRating.length).toFixed(2) || 0;
    return averageValue;
  }
}
