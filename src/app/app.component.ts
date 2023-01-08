import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';

import FooterComponent from '@core/components/footer/footer.component';
import HeaderComponent from '@core/components/header/header/header.component';
import * as UserAction from './redux/actions/user.actions';
import * as ReviewAction from '@redux/actions/review.actions';
import { UserApiService } from '@core/services/user-api.service';
import { AuthService } from '@auth/services/auth.service';
import { UserInfo } from './models/user.interfaces';
import { BlockStatus } from './app.constants';
import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  currentName: string | undefined;
  constructor(
    private store: Store,
    private userService: UserApiService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.store.dispatch(UserAction.FetchUser());
    this.store.dispatch(UserAction.GetUsers());
    this.store.dispatch(ReviewAction.GetReviews());
    this.userService
      .getCurrentUser()
      .pipe(map((user: UserInfo | null) => (this.currentName = user?.username)));
  }

  @HostListener('document: click', ['$event'])
  async onClick(event: any) {
    this.store.dispatch(UserAction.GetUsers());
    this.userService.getCurrentUsers().subscribe((users: UserInfo[]) => {
      const blockedUser = users.filter(
        (user) => user.status === BlockStatus.blocked && user.username === this.currentName
      );
      console.log(blockedUser)
      const deletedUser = users.find((user) => user.username === this.currentName);
      (blockedUser.length > 0 || !deletedUser) && this.authService.logout();
    });
  }
}
