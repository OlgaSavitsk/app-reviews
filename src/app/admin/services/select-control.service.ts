import { Injectable, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { UserApiService } from '@core/services/user-api.service';
import { UserInfo } from 'src/app/models/user.interfaces';

@Injectable({
  providedIn: 'root',
})
export class SelectControlService {
  @ViewChild(MatSort) sort!: MatSort;
 // @ViewChild(MatPaginator) paginator!: MatPaginator;
  userState: UserInfo[] = [];
  dataSource: MatTableDataSource<UserInfo> | undefined;
  selection = new SelectionModel<UserInfo>(true, []);
  selectedUser!: UserInfo[];

  constructor(private userService: UserApiService) {}

  setAdmiUsers() {
    this.userService.getCurrentUsers().subscribe((users) => {
      this.userState = users.map((user: UserInfo) => user);
      this.dataSource = new MatTableDataSource(this.userState);
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource!.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource!.data);
  }

  checkboxLabel(row?: UserInfo) {
    const selectedUser = this.selection.selected;
    this.selectedUser = selectedUser;
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id + 1
    }`;
  }
}
