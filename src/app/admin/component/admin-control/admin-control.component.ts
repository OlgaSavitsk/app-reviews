import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MaterialModule } from 'src/app/material/material.module';
import { UserInfo } from 'src/app/models/user.interfaces';
import { UserState } from 'src/app/redux/state/custom.state';
import * as UserAction from '../../../redux/actions/user.actions';

@Component({
  selector: 'app-admin-control',
  standalone: true,
  imports: [CommonModule, MaterialModule, TranslateModule],
  templateUrl: './admin-control.component.html',
  styleUrls: ['./admin-control.component.scss'],
})
export class AdminControlComponent implements OnInit {
  @Input() selectedUser!: UserInfo[];
  roleList!: string[];

  constructor(
    private translateService: TranslateService,
    private store: Store<UserState>,
  ) {}

  ngOnInit(): void {
    this.translateService
      .stream(['Admin', 'User'])
      .subscribe((roles) => (this.roleList = Object.values(roles)));
  }

  changeRole(event: string) {}

  deleteUser() {
    if (this.selectedUser.length > 0) {
      this.selectedUser.forEach((user) =>
        this.store.dispatch(UserAction.DeleteUser({ id: user.id })),
      );
    }
  }
}
