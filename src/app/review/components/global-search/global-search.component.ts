import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as SearchReviewAction from '@redux/actions/search-review.action';
import { ReviewInfo } from 'src/app/models/review.interface';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { TranslateModule } from '@ngx-translate/core';
import { ReviewControlService } from '../../services/review-control.service';
import { FileService } from '../../services/file.service';
import { SafeUrl } from '@angular/platform-browser';

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
  public searchValue: string = '';
  public foundReviews: ReviewInfo[] = [];
  imageSrc: SafeUrl | undefined;

  constructor(
    private store: Store,
    private router: Router,
    private reviewControlService: ReviewControlService,
    private fileService: FileService,
  ) {}

  public ngOnInit() {
    this.reviewControlService.getSearchReview().subscribe((reviews) => {
      this.foundReviews = reviews
      reviews.forEach(review =>  this.renderFileSrc(review.filePath))
    });
   
  }

  public searchReview(searchValue: string): void {
    if (!searchValue) {
      this.foundReviews = [];
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

  public goToReview(review: ReviewInfo) {
    // if (task.boardId) {
    //   this.router.navigate(['/boards', task.boardId]);
    // }
  }
}
