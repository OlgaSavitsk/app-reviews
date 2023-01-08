import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { UserApiService } from '@core/services/user-api.service';
import { Store } from '@ngrx/store';
import * as UserAction from '@redux/actions/user.actions';
import { ReviewControlService } from '@review/services/review-control.service';
import { MaterialModule } from 'src/app/material/material.module';
import { ReviewInfo } from 'src/app/models/review.interface';
import { UserInfo, UserUpdate } from 'src/app/models/user.interfaces';

@Component({
  selector: 'app-like',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss'],
})
export class LikeComponent implements OnInit {
  @Input() data!: ReviewInfo;
  likes = this.data?.like;
  isActive!: boolean;
  currentUser!: UserInfo;

  constructor(
    private reviewControlService: ReviewControlService,
    private userService: UserApiService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.dispatch(UserAction.FetchUser());
    this.userService.getCurrentUser().subscribe((user: UserInfo | null) => {
      if (user) {
        this.currentUser = user;
      }
    });
    this.likes = this.data?.like;
  }

  updateLikes(i: number): void {
    this.isActive = !this.isActive;

    if (this.isActive) {
      this.likes = i + 1;
      const updateDto: UserUpdate = {
        liked: [this.data.id],
      };
      this.store.dispatch(UserAction.UpdateUser({ user: this.currentUser, updateDto }));
    } else {
      this.likes -= 1;
    }
    this.reviewControlService.ratingValue = this.likes;
    this.reviewControlService.addRating(this.data!, 'like');
  }
}
