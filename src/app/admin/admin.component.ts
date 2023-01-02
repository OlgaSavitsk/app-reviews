import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Store } from '@ngrx/store';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { TranslateModule } from '@ngx-translate/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';

import { MaterialModule } from 'src/app/material/material.module';
import { UserInfo } from 'src/app/models/user.interfaces';
import * as UserAction from '@redux/actions/user.actions';
import { DateAgoPipe } from '@core/pipes/date-ago.pipe';
import { UserApiService } from '@core/services/user-api.service';
import { Router } from '@angular/router';
import { AdminControlComponent } from './component/admin-control/admin-control.component';
import { BlockStatus, displayedColumnsUsers } from '../app.constants';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    NgOptimizedImage,
    DateAgoPipe,
    AdminControlComponent,
    TranslateModule,
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit, AfterContentChecked {
  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns = displayedColumnsUsers;

  dataSource: MatTableDataSource<UserInfo> | undefined;

  selection = new SelectionModel<UserInfo>(true, []);

  selectedUsers!: UserInfo[];

  constructor(
    private store: Store,
    private userService: UserApiService,
    private changeDetector: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store.dispatch(UserAction.GetUsers());
    this.userService.getCurrentUsers().subscribe((users) => {
      this.dataSource = new MatTableDataSource(users);
      this.dataSource!.paginator = this.paginator;
    });
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  sortChange(sortState: Sort): void {
    if (sortState.direction) {
      this.dataSource!.sort = this.sort;
    }
  }

  changeStatus(user: UserInfo): void {
    const status = user.status === BlockStatus.active ? BlockStatus.blocked : BlockStatus.active;
    this.store.dispatch(UserAction.UpdateUser({ user, status }));
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource!.data.length;
    return numSelected === numRows;
  }

  toggleAllRows(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource!.data);
  }

  checkboxLabel(row?: UserInfo): string {
    const selectedUser = this.selection.selected;
    this.selectedUsers = selectedUser;
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  onSelectUser(id: string) {
    this.router.navigate(['/', 'review', id]);
  }
}
