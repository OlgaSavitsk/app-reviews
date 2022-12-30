import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserApiService } from '@core/services/user-api.service';

import { displayedColumnsReviews, ReviewDialogAction } from '../app.constants';
import { MaterialModule } from '../material/material.module';
import { UserInfo } from '../models/user.interfaces';
import { ReviewDialogComponent } from '../dialog/review-dialog/review-dialog.component';
import { ReviewInfo } from '../models/review.interface';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [CommonModule, MaterialModule, TranslateModule],
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
})
export class ReviewComponent {
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns = displayedColumnsReviews;
  dataSource: MatTableDataSource<ReviewInfo> | undefined;
 // responseMessage: string = '';
  userId: string | null = null;

  constructor(
    private dialog: MatDialog,
    private userService: UserApiService,
    private router: ActivatedRoute,
    private translateService: TranslateService
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
        const currentUser = users?.find((user) => user.id === this.userId);
        if (currentUser) {
          this.dataSource = new MatTableDataSource(currentUser.reviews);
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
      data: { action: this.translateService.instant("DIALOG.dataAddAction"), data: this.userId },
      width: '100%',
    });
  }

  editAction(element: ReviewInfo): void {
    this.dialog.open(ReviewDialogComponent, {
      data: { action: this.translateService.instant("DIALOG.dataEditAction"), data: element },
      width: '100%',
    });
  }

  deleteAction(element: ReviewInfo) {
    
  }
}
