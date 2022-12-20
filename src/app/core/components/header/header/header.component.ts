import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HeaderAnimateDirective } from '@core/directives/header-animate.directive';
import { UserApiService } from '@core/services/user-api.service';
import { Store } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { map, Observable } from 'rxjs';
import { Path } from 'src/app/app.constants';

import { MaterialModule } from 'src/app/material/material.module';
import { UserInfo } from 'src/app/models/user.interfaces';
import * as UserAction from 'src/app/redux/actions/user.actions';
import { LangComponent } from '../lang/lang.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    HeaderAnimateDirective,
    RouterModule,
    NgOptimizedImage,
    LangComponent,
    TranslateModule,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export default class HeaderComponent implements OnInit {
  currentUser$: Observable<UserInfo | null> = this.userService
    .getCurrentUser()
    .pipe(map((user: UserInfo | null) => user));
  isLoggedIn$ = this.userService
    .getCurrentUser()
    .pipe(map((user: UserInfo | null) => !!user));

  constructor(
    private router: Router,
    private userService: UserApiService,
    private store: Store,
  ) {}

  ngOnInit(): void {}

  logout() {
    this.store.dispatch(UserAction.ClearData());
    this.router.navigateByUrl(Path.loginPage);
  }
}
