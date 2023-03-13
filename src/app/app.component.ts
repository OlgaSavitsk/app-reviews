import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';

import FooterComponent from '@core/components/footer/footer.component';
import HeaderComponent from '@core/components/header/header/header.component';
import { UserApiService } from '@core/services/user-api.service';
import { map } from 'rxjs';
import { UserInfo } from './models/user.interfaces';
import * as UserAction from './redux/actions/user.actions';
import * as ReviewAction from '@redux/actions/review.actions';

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
    private userService: UserApiService
  ) {}

  ngOnInit() {
    this.store.dispatch(UserAction.FetchUser());
    this.store.dispatch(UserAction.GetUsers());
    this.store.dispatch(ReviewAction.GetReviews());
    this.userService
      .getCurrentUser()
      .pipe(map((user: UserInfo | null) => (this.currentName = user?.username)));
  }
}
