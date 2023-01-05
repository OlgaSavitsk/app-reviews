import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { SafeUrl } from '@angular/platform-browser';
import { map } from 'rxjs';

import * as SearchReviewAction from '@redux/actions/search-review.action';
import { ReviewInfo } from 'src/app/models/review.interface';
import { MaterialModule } from 'src/app/material/material.module';
import { ReviewControlService } from '@review/services/review-control.service';
import { FileService } from '@review/services/file.service';

export enum ReviewProp {
  name,
  title,
  description,
  tags,
  category,
}

export const REVIEW = { property: ReviewProp };

@Component({
  selector: 'app-global-search',
  standalone: true,
  imports: [CommonModule, MaterialModule, TranslateModule],
  templateUrl: './global-search.component.html',
  styleUrls: ['./global-search.component.scss'],
})
export class GlobalSearchComponent implements OnInit {
  public searchValue = '';

  public foundReviews: ReviewInfo[] = [];

  imageSrc: SafeUrl | undefined;

  responseMessage = '';

  constructor(
    private store: Store,
    private router: Router,
    private reviewControlService: ReviewControlService,
    public fileService: FileService
  ) {}

  ngOnInit() {
    this.reviewControlService.getSearchReview().subscribe((reviews) => {
      this.foundReviews = reviews.map((review) => ({
        ...review,
        fileUrl: this.fileService.getReviewImage(review.filePath).pipe(map((file) => file)),
      }));
    });
    this.reviewControlService.getErrorSearchReview().subscribe((error) => {
      if (error) this.responseMessage = error.error.message;
      this.foundReviews = [];
    });
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

  renderFileSrc(filePath: string) {
    this.fileService.getReviewImage(filePath).subscribe((fileUrl) => {
      this.imageSrc = fileUrl;
    });
  }

  goToReview(review: ReviewInfo) {
    if (review.id) {
      this.router.navigate([review.id]);
      this.foundReviews = [];
      this.responseMessage = '';
    }
  }
}
