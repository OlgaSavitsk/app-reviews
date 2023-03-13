import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, switchMap } from 'rxjs';
import { marked } from 'marked';

import { FileService } from '@review/services/file.service';
import * as ReviewAction from '@redux/actions/review.actions';
import { selectReviewById } from '@redux/selectors/collection.selector';
import { ReviewControlService } from '@review/services/review-control.service';
import { RatingComponent } from '@review/components/rating/rating.component';
import { LikeComponent } from '@review/components/like/like.component';
import { ReviewInfo } from '../models/review.interface';
import { MaterialModule } from '../material/material.module';
import { UserInfo } from '../models/user.interfaces';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-review-details-page',
  standalone: true,
  imports: [CommonModule, MaterialModule, RatingComponent, ChatComponent, LikeComponent],
  templateUrl: './review-details-page.component.html',
  styleUrls: ['./review-details-page.component.scss'],
})
export class ReviewDetailsPageComponent implements OnInit {
  review: ReviewInfo | undefined;
  imageUrl: Observable<SafeUrl> | undefined;
  allTags: string[] | undefined;
  template: string | undefined;
  user!: Observable<UserInfo>;
  id: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private fileService: FileService,
    private reviewControlService: ReviewControlService
  ) {}

  ngOnInit(): void {
    const fetchData$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const id = params.get('id');
        this.id = id!;
        return this.store.select(selectReviewById(id!));
      })
    );
    fetchData$.subscribe((data) => {
      if (data) {
        this.review = data;
        this.imageUrl = this.fileService
          .getReviewImage(this.review.filePath)
          .pipe(map((file) => file));
        this.user = this.reviewControlService.getUserById(data.userId).pipe();
      }
    });
    this.renderDescription();
    this.renderTags();
  }

  renderTags(): void {
    this.store.dispatch(ReviewAction.GetReviewsTags());
    this.reviewControlService.getAllTags().subscribe((tags) => {
      this.allTags = tags;
    });
  }

  renderDescription(): void {
    if (this.review) this.template = marked.parse(this.review.description);
  }
}
