import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

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

  constructor(private reviewControlService: ReviewControlService, private store: Store) {}

  ngOnInit(): void {
    this.rating = this.data.rating;
    this.reviewControlService.getRatingOfArt(this.data.name).subscribe((reviews) => {
      const totalRating = reviews.map((review) => review.rating).filter(Boolean);
      const sumRating = totalRating.reduce((acc, rate) => acc + rate, 0);
      this.averageRating = +(sumRating / totalRating.length).toFixed(2) || 0;
    });
  }

  updateRating(i: number): void {
    this.rating = i;
    this.reviewControlService.rating = i;
    this.reviewControlService.addRating(this.data);
  }
}
