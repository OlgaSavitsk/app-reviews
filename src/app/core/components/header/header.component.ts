import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HeaderAnimateDirective } from '@core/directives/header-animate.directive';
import { UserApiService } from '@core/services/user-api.service';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { Path } from 'src/app/app.constants';

import { MaterialModule } from 'src/app/material/material.module';
import { UserInfo } from 'src/app/models/user.interfaces';
import * as UserAction from 'src/app/redux/actions/user.actions'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MaterialModule, HeaderAnimateDirective, RouterModule, NgOptimizedImage],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export default class HeaderComponent implements OnInit {
  slideValue: boolean = false;
  lang!: string;

  currentUser$: Observable<UserInfo | null> = this.userService
    .getCurrentUser()
    .pipe(map((user: UserInfo | null) => user));
  isLoggedIn$ = this.userService
  .getCurrentUser()
  .pipe(map((user: UserInfo | null) => !!user));;

  constructor(
    private router: Router,
    private userService: UserApiService,
    private store: Store,
  ) { }

  ngOnInit(): void {
    console.log(this.currentUser$)   
  }

  changeLang(value: boolean): void {
    if (value) {
      this.lang = 'EN';
    } else {
      this.lang = 'RU';
    }
    //this.translateService.use(this.lang);
  }

  logout() {
    this.store.dispatch(UserAction.ClearData())
    this.router.navigateByUrl(Path.loginPage);
  }
}
