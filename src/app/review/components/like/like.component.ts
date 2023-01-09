import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UserApiService } from '@core/services/user-api.service';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as UserAction from '@redux/actions/user.actions';
import { ReviewControlService } from '@review/services/review-control.service';
import { MaterialModule } from 'src/app/material/material.module';
import { ReviewInfo, updateReview } from 'src/app/models/review.interface';
import { UserInfo } from 'src/app/models/user.interfaces';

@Component({
  selector: 'app-like',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss'],
})
export class LikeComponent implements OnInit, OnDestroy {
  @Input() data!: ReviewInfo;
  private subscription: Subscription | undefined;
  likes!: number;
  isActive!: boolean;
  currentUser!: UserInfo;
  updateDto = updateReview;

  constructor(
    private reviewControlService: ReviewControlService,
    private userService: UserApiService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.likes = this.data?.likes || 0;
    this.store.dispatch(UserAction.FetchUser());
    const subscription1$ = this.userService.getCurrentUser().subscribe((user: UserInfo | null) => {
      if (user) {
        this.currentUser = user;
      }
    });
    if (this.data.likedUser?.includes(this.currentUser?.id)) {
      this.isActive = true;
    }
    this.subscription?.add(subscription1$);
  }

  updateLikes(i: number): void {
    this.isActive = !this.isActive;
    if (this.isActive) {
      this.likes = i + 1;
      (this.updateDto!.likes = this.likes), (this.updateDto!.likedUser = this.currentUser?.id);
    } else {
      this.likes -= 1;
      this.updateDto!.likes = this.likes;
      this.updateDto!.likedUser = '';
    }
    this.reviewControlService.addRating(this.data, this.updateDto!);
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
