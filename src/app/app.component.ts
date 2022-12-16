import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';

import FooterComponent from '@core/components/footer/footer.component';
import { UserApiService } from '@core/services/user-api.service';
import * as UserAction from './redux/actions/user.actions';
import HeaderComponent from '@core/components/header/header/header.component';
import { SigninComponent } from '@auth/components/login/login.component';
import { SignupComponent } from '@auth/components/signup/signup.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(public userService: UserApiService, private store: Store, private http: HttpClient) {}

  ngOnInit() {
    this.store.dispatch(UserAction.FetchUser());
  }
}
