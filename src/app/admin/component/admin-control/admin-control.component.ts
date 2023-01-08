import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { MaterialModule } from 'src/app/material/material.module';
import { UserInfo } from 'src/app/models/user.interfaces';
import * as UserAction from '../../../redux/actions/user.actions';

@Component({
  selector: 'app-admin-control',
  standalone: true,
  imports: [CommonModule, MaterialModule, TranslateModule],
  templateUrl: './admin-control.component.html',
  styleUrls: ['./admin-control.component.scss'],
})
export class AdminControlComponent implements OnInit, OnDestroy {
  @Input() selectedUser!: UserInfo[];
  roleList!: string[];
  subscription!: Subscription;

  constructor(private translateService: TranslateService, private store: Store) {}

  ngOnInit(): void {
    this.subscription = this.translateService
      .stream(['Admin', 'User'])
      .subscribe((roles) => (this.roleList = Object.values(roles)));
  }

  deleteUser() {
    if (this.selectedUser.length > 0) {
      this.selectedUser.forEach((user) =>
        this.store.dispatch(UserAction.DeleteUser({ id: user.id }))
      );
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
