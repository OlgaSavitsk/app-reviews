import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { AveragingService } from '@core/services/averaging.service';

import { MaterialModule } from 'src/app/material/material.module';
import { ReviewInfo, updateReview } from 'src/app/models/review.interface';
import { ReviewControlService } from '../../services/review-control.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-star',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit {
  @Input() data!: ReviewInfo;
  updateDto = updateReview;
  rating = 0;
  averageRating: number = 0;
  stars = [1, 2, 3, 4, 5];

  constructor(
    private reviewControlService: ReviewControlService,
    private averagingService: AveragingService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.averageRating = this.averagingService.averaging(this.data.name, 0);
    this.rating = this.averageRating   
  }

  updateRating(i: number): void {
    this.rating = i;
    this.updateDto!.rating = i;
    this.reviewControlService.addRating(this.data, this.updateDto!);   
    this.averageRating = this.averagingService.averaging(this.data.name, i);    
  }
}
