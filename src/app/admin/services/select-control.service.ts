import { Injectable } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';

import { MatTableDataSource } from '@angular/material/table';

import { UserInfo } from 'src/app/models/user.interfaces';

@Injectable({
  providedIn: 'root',
})
export class SelectControlService {
  userState: UserInfo[] = [];

  dataSource: MatTableDataSource<UserInfo> | undefined;

  selection = new SelectionModel<UserInfo>(true, []);

  selectedUser!: UserInfo[];

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
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
}
