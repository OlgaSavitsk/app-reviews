import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SafeUrl } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { MaterialModule } from 'src/app/material/material.module';
import { RatingComponent } from 'src/app/review/components/rating/rating.component';
import { FileService } from 'src/app/review/services/file.service';
import * as ReviewAction from '@redux/actions/review.actions';
import { ReviewControlService } from 'src/app/review/services/review-control.service';
import { marked } from 'marked';
import { ReviewInfo } from 'src/app/models/review.interface';
import { ListMessageComponent } from 'src/app/chat/list-message/list-message.component';
import { LikeComponent } from '@review/components/like/like.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details-review',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    NgOptimizedImage,
    RatingComponent,
    ListMessageComponent,
    LikeComponent,
  ],
  templateUrl: './details-review.component.html',
  styleUrls: ['./details-review.component.scss'],
})
export class DetailsReviewComponent implements OnInit, OnDestroy {
  imageSrc: SafeUrl | undefined;
  allTags: string[] | undefined;
  template: string | undefined;
  tags: string[] = this.dialogData.data.tags;
  rating!: number;
  subscription!: Subscription;

  constructor(
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public dialogData: { data: ReviewInfo; username: string },
    public dialogRef: MatDialogRef<DetailsReviewComponent>,
    private fileService: FileService,
    private reviewControlService: ReviewControlService
  ) {}

  ngOnInit() {
    this.renderFileSrc(this.dialogData.data.filePath);
    this.renderTags();
    this.renderDescription();
  }

  renderFileSrc(filePath: string) {
    const subscription1$ = this.fileService.getReviewImage(filePath).subscribe((fileUrl) => {
      this.imageSrc = fileUrl;
    });
    this.subscription.add(subscription1$);
  }

  renderTags() {
    this.store.dispatch(ReviewAction.GetReviewsTags());
    const subscription2$ = this.reviewControlService.getAllTags().subscribe((tags) => {
      this.allTags = tags;
    });
    this.subscription.add(subscription2$);
  }

  renderDescription() {
    this.template = marked.parse(this.dialogData.data.description);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
