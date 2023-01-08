import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { switchMap } from 'rxjs';
import { Store } from '@ngrx/store';

import { DialogService } from '@core/services/dialog.service';
import * as ReviewAction from '@redux/actions/review.actions';
import { selectUserById } from '@redux/selectors/collection.selector';
import { displayedColumnsReviews } from '../app.constants';
import { MaterialModule } from '../material/material.module';
import { UserInfo } from '../models/user.interfaces';
import { ReviewDialogComponent } from '../dialog/review-dialog/review-dialog.component';
import { ReviewInfo } from '../models/review.interface';
import { RatingComponent } from './components/rating/rating.component';
import { DetailsReviewComponent } from '../dialog/details-review/details-review.component';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule, MaterialModule, TranslateModule, RatingComponent],
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns = displayedColumnsReviews;
  dataSource: MatTableDataSource<ReviewInfo> | undefined;
  currentUser: UserInfo | undefined;
  userId: string | null | undefined;

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private translateService: TranslateService,
    private dialogService: DialogService,
    private store: Store
  ) {}

  ngOnInit(): void {
    const fetchData$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const id = params.get('id');
        this.userId = id;
        return this.store.select(selectUserById(id!));
      })
    );
    fetchData$.subscribe((data) => {
      if (data) {
        this.currentUser = data;
        this.dataSource = new MatTableDataSource(this.currentUser.reviews);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  ngAfterViewInit() {
    if (this.dataSource) this.dataSource.paginator = this.paginator;
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
}
