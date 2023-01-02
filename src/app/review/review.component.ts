import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserApiService } from '@core/services/user-api.service';

import { Store } from '@ngrx/store';
import { DialogService } from '@core/services/dialog.service';
import { displayedColumnsReviews } from '../app.constants';
import { MaterialModule } from '../material/material.module';
import { UserInfo } from '../models/user.interfaces';
import { ReviewDialogComponent } from '../dialog/review-dialog/review-dialog.component';
import { ReviewInfo } from '../models/review.interface';
import * as ReviewAction from '../redux/actions/review.actions';
import { StarComponent } from './components/star/star.component';
import { DetailsReviewComponent } from '../dialog/details-review/details-review.component';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule, MaterialModule, TranslateModule, StarComponent],
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit {
  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns = displayedColumnsReviews;

  dataSource: MatTableDataSource<ReviewInfo> | undefined;

  // responseMessage: string = '';
  userId: string | null = null;

  currentUser: UserInfo | undefined;

  constructor(
    private dialog: MatDialog,
    private userService: UserApiService,
    private router: ActivatedRoute,
    private translateService: TranslateService,
    private dialogService: DialogService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      const userId = params['id'];
      this.userId = userId || null;
    });
    this.renderData();
  }

  renderData(): void {
    this.userService.getCurrentUsers().subscribe({
      next: (users: UserInfo[] | null) => {
        this.currentUser = users?.find((user) => user.id === this.userId);
        if (this.currentUser) {
          this.dataSource = new MatTableDataSource(this.currentUser.reviews);
          this.dataSource.paginator = this.paginator;
        }
      },
      error: (error: Error) => {
        if (error.message) {
          // this.responseMessage = error.message;
        }
      },
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.dataSource) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }

  sortChange(sortState: Sort): void {
    if (sortState.direction) {
      this.dataSource!.sort = this.sort;
    }
  }

  addAction(): void {
    this.dialog.open(ReviewDialogComponent, {
      data: {
        action: this.translateService.instant('DIALOG.dataAddAction'),
        data: this.userId,
      },
      width: '100%',
    });
  }

  editAction(element: ReviewInfo): void {
    this.dialog.open(ReviewDialogComponent, {
      data: {
        action: this.translateService.instant('DIALOG.dataEditAction'),
        data: element,
      },
      width: '100%',
    });
  }

  detailsAction(element: ReviewInfo) {
    this.dialog.open(DetailsReviewComponent, {
      data: {
        // action: this.translateService.instant('DIALOG.dataEditAction'),
        data: element,
        username: this.currentUser?.username,
      },
      width: '35%',
    });
  }

  deleteAction(element: ReviewInfo) {
    this.dialogService
      .confirmDialog({
        param: 'CONFIRM.paramReview',
      })
      .subscribe((confirmed) => {
        if (confirmed) {
          this.store.dispatch(ReviewAction.DeleteReview({ id: element.id }));
        }
      });
  }

  addRating(ratingValue: number) {
    console.log(ratingValue);
  }
}
