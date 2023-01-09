import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { map, Subscription } from 'rxjs';

import * as SearchReviewAction from '@redux/actions/search-review.action';
import { ReviewInfo } from 'src/app/models/review.interface';
import { MaterialModule } from 'src/app/material/material.module';
import { ReviewControlService } from '@review/services/review-control.service';
import { FileService } from '@review/services/file.service';
import { Path } from 'src/app/app.constants';

@Component({
  selector: 'app-global-search',
  standalone: true,
  imports: [CommonModule, MaterialModule, TranslateModule],
  templateUrl: './global-search.component.html',
  styleUrls: ['./global-search.component.scss'],
})
export class GlobalSearchComponent implements OnInit, OnDestroy {
  searchValue = '';
  foundReviews: ReviewInfo[] = [];
  responseMessage = '';
  private subscription: Subscription | undefined;

  constructor(
    private store: Store,
    private router: Router,
    private reviewControlService: ReviewControlService,
    public fileService: FileService
  ) {}

  ngOnInit() {
    const subscription1$ = this.reviewControlService.getSearchReview().subscribe((reviews) => {
      this.foundReviews = reviews.map((review) => ({
        ...review,
       fileUrl: this.fileService.getReviewImage(review.filePath).pipe(map((file) => file)),
      }));
    });
    const subscription2$ = this.reviewControlService.getErrorSearchReview().subscribe((error) => {
      if (error) this.responseMessage = error.error.message;
      this.foundReviews = [];
    });
   this.subscription?.add(subscription1$);
   this.subscription?.add(subscription2$);
  }

  searchReview(searchValue: string): void {
    if (!searchValue) {
      this.foundReviews = [];
      this.responseMessage = '';
      return;
    }
    searchValue = searchValue.toLowerCase().trim();
    this.store.dispatch(SearchReviewAction.GetSearchReviews({ searchValue }));
  }

  goToReview(review: ReviewInfo) {
    if (review.id) {
      this.router.navigate([`${Path.detailsPage}/${review.id}`]);
      this.foundReviews = [];
      this.responseMessage = '';
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
