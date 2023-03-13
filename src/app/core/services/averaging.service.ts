import { Injectable } from '@angular/core';
import { ReviewControlService } from '@review/services/review-control.service';

@Injectable({
  providedIn: 'root',
})
export class AveragingService {
  averageValue: number = 0;
  constructor(private reviewControlService: ReviewControlService) {}

  averaging(nameOfMovie: string, i: number): number {
    this.reviewControlService.getRatingOfArt(nameOfMovie).subscribe((reviews) => {
      const totalRating = reviews
        .map((review) => review.rating)
        .filter(Boolean)
        .flat();
      const sumRating = totalRating.reduce((acc, rate) => acc + +rate, 0);
      this.averageValue =
        +((sumRating + +i) / (i ? totalRating.length + 1 : totalRating.length)).toFixed(2) || 0;
    });
    return this.averageValue;
  }
}
