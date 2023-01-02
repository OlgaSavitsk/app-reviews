import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';

import { Path } from 'src/app/app.constants';
import { UserInfo } from 'src/app/models/user.interfaces';
import { LoginRequestModel, RegisterRequestModel } from '@auth/models/auth.model';
import * as UserActions from 'src/app/redux/actions/user.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private store: Store, private router: Router) {}

  register(payload: RegisterRequestModel): Observable<UserInfo> {
    return this.http.post<UserInfo>('auth/signup', payload).pipe(
      tap(() => {
        this.router.navigate([Path.loginPage]);
      })
    );
  }

  login({ username, password }: LoginRequestModel): Observable<UserInfo> {
    return this.http
      .post<UserInfo>('auth/signin', { username, password }, { withCredentials: true })
      .pipe(
        switchMap(() => this.fetchUser()),
        tap((response) => this.handleResponse(response))
      );
  }

  private handleResponse(response: UserInfo): void {
    this.store.dispatch(UserActions.FetchUserSuccess({ user: response }));
  }

  fetchUser(): Observable<UserInfo> {
    return this.http.get<UserInfo>('auth/user-profile', {
      withCredentials: true,
    });
  }

  logout(): Subscription {
    return this.http.get('auth/logout', { withCredentials: true }).subscribe();
  }
}
