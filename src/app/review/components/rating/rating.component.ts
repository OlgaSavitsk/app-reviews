import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AveragingService } from '@core/services/averaging.service';

import { MaterialModule } from 'src/app/material/material.module';
import { ReviewInfo } from 'src/app/models/review.interface';
import { ReviewControlService } from '../../services/review-control.service';

@Component({
  selector: 'app-star',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit {
  @Input() data!: ReviewInfo;
  rating = 0;
  averageRating = 0;
  stars = [1, 2, 3, 4, 5];

  constructor(
    private reviewControlService: ReviewControlService,
    private averagingService: AveragingService
  ) {}

  ngOnInit(): void {
    this.rating = this.data.rating;
    this.reviewControlService.getRatingOfArt(this.data.name).subscribe((reviews) => {
      this.averageRating = this.averagingService.averaging(reviews, 'rating');
    });
  }

  updateRating(i: number): void {
    this.rating = i;
    this.reviewControlService.rating = i;
    this.reviewControlService.addRating(this.data, 'rating');
  }
}
