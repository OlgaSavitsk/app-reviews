import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  Subscription,
  switchMap,
  tap,
} from 'rxjs';

import { Path, STORAGE_NAME } from 'src/app/app.constants';
import { LocalStorageService } from '@core/services/localstorage.service';
import { UserInfo } from 'src/app/models/user.interfaces';
import {
  LoginRequestModel,
  RegisterRequestModel,
} from '@auth/models/auth.model';
import { Store } from '@ngrx/store';
import * as UserActions from 'src/app/redux/actions/user.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private storageService: LocalStorageService,
    private store: Store,
    private router: Router,
  ) {}

  register(payload: RegisterRequestModel): Observable<UserInfo> {
    return this.http.post<UserInfo>('auth/signup', payload).pipe(
      tap(() => {
        this.router.navigate([Path.loginPage]);
      }),
    );
  }

  login({ username, password }: LoginRequestModel) {
    return this.http
      .post<UserInfo>(
        'auth/signin',
        { username, password },
        { withCredentials: true },
      )
      .pipe(
        switchMap(() => this.fetchUser()),
        tap((response) => this.handleResponse(response)),
      );
  }

  googleLogin(role: string) {
    return this.http.post<UserInfo>('auth/google', role, {
      withCredentials: true,
    });
  }

  private handleResponse(response: UserInfo): void {
    console.log(response);
    this.store.dispatch(UserActions.FetchUserSuccess({ user: response }));
  }

  fetchUser(): Observable<UserInfo> {
    return this.http.get<UserInfo>('auth/user-profile', {
      withCredentials: true,
    });
  }

  setStorage(token: string, name: string): void {
    this.storageService.setStorageData({ token, name }, STORAGE_NAME);
  }

  getUsers(): Observable<UserInfo[]> {
    return this.http.get<UserInfo[]>('user');
  }

  logout(): Subscription {
    return this.http.get('auth/logout', { withCredentials: true }).subscribe();
  }
}
