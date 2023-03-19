import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

import SortPipe from '@core/pipes/sort.pipe';
import { FileService } from '@review/services/file.service';
import { ReviewControlService } from '@review/services/review-control.service';
import * as ReviewAction from '@redux/actions/review.actions';
import { ReviewApiService } from '@review/services/review-api.service';
import { TagsSelectComponent } from '@review/components/tags-select/tags-select.component';
import { RatingComponent } from '@review/components/rating/rating.component';
import { TranslateModule } from '@ngx-translate/core';
import { Path } from '../app.constants';
import { MaterialModule } from '../material/material.module';
import { UserInfo } from '../models/user.interfaces';
import { ReviewInfo } from '../models/review.interface';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    CommonModule,
    RatingComponent,
    SortPipe,
    MaterialModule,
    TagsSelectComponent,
    TranslateModule,
    NgxSpinnerModule,
  ],
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('widgetsContent', { static: false }) widgetsContent!: ElementRef;
  @ViewChildren('item') itemElements: QueryList<ReviewInfo> | undefined;
  reviews: ReviewInfo[] = [];
  page = 1;
  limit = 5;
  scrollContainer!: HTMLElement;
  allTags: string[] | undefined;
  tagsReviews: ReviewInfo[] = [];
  popularReviews!: ReviewInfo[];
  private subscription: Subscription | undefined;

  constructor(
    private store: Store,
    private reviewControlService: ReviewControlService,
    private reviewApiService: ReviewApiService,
    private fileService: FileService,
    private router: Router,
  ) {}

  ngOnInit() {
    //this.store.dispatch(ReviewAction.GetReviews());
    this.renderNewReview();
    this.renderPopularReviews();
    this.renderTags();
  }

  ngAfterViewInit(): void {
    this.scrollContainer = this.widgetsContent.nativeElement;
  }

  renderNewReview(): void {
    const subscription1$ = this.reviewApiService
      .getReviewsPaginate(this.page, this.limit)
      .subscribe((review: any) => {
        review.items.forEach((review: ReviewInfo) => {
          this.reviews.push(this.createReview(review));
        });
        if (review.items.length === 0) {
          this.page = 0;
        }
      });
    this.subscription?.add(subscription1$);
  }

  renderPopularReviews(): void {
    const scription2$ = this.reviewControlService.getAllReviews().subscribe((reviews) => {
      this.popularReviews = reviews.map((review) => this.createReview(review));
    });
    this.subscription?.add(scription2$);
  }

  createReview(review: ReviewInfo): ReviewInfo {
    return {
      ...review,
      fileUrl: this.fileService.getReviewImage(review.filePath).pipe(map((file) => file)),
      username: this.reviewControlService
        .getUserById(review.userId)
        .pipe(map((user: UserInfo) => user?.username)),
    };
  }

  setNext(): void {
    this.scrollContainer.scrollLeft += 300;
    this.page += 1;
    this.renderNewReview();
  }

  setBack(): void {
    this.scrollContainer.scrollLeft -= 300;
  }

  renderTags(): void {
    this.store.dispatch(ReviewAction.GetReviewsTags());
    const scription3$ = this.reviewControlService.getAllTags().subscribe((tags) => {
      this.allTags = [...new Set(tags.flat())];
    });
    this.subscription?.add(scription3$);
  }

  renderReviewsByTag(tag: string): void {
    this.tagsReviews = [];
    this.reviewControlService.getAllReviews().subscribe((reviews) => {
      reviews.forEach((review) => {
        const renderReview = this.createReview(review)
        if (renderReview.tags.flat().includes(tag)) {
          this.tagsReviews.push(renderReview);
        }
      });
    });
  }

  disabled(event: Event) {
    event.preventDefault()
  }

  toReviewDetails(review: ReviewInfo): void {
    if (review.id) {
      this.router.navigate([`${Path.detailsPage}/${review.id}`]);
    }
  }
 
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
