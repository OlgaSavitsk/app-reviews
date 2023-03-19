import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AveragingService } from '@core/services/averaging.service';

import { MaterialModule } from 'src/app/material/material.module';
import { ReviewInfo, updateReview } from 'src/app/models/review.interface';
import { ReviewControlService } from '../../services/review-control.service';

@Component({
  selector: 'app-star',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit, OnChanges {
  @Input() data!: ReviewInfo;
  updateDto = updateReview;
  rating = 0;
  averageRating: number = 0;
  stars = [1, 2, 3, 4, 5];

  constructor(
    private reviewControlService: ReviewControlService,
    private averagingService: AveragingService,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }

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
