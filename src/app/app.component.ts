import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';

import FooterComponent from '@core/components/footer/footer.component';
import HeaderComponent from '@core/components/header/header/header.component';
import * as UserAction from './redux/actions/user.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(UserAction.FetchUser());
    this.store.dispatch(UserAction.GetUsers());
  }
}
