import { Injectable } from '@angular/core';
import { catchError, map, tap, of, switchMap, switchMapTo } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserApiService } from '@core/services/user-api.service';
import * as UserActions from './actions/user.actions';
import { UserInfo } from '../models/user.interfaces';
import { AuthService } from '@auth/services/auth.service';
import { AuthResponseModel } from '@auth/models/auth.model';

@Injectable()
export class UserEffects {
  fetchUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.FetchUser),
      switchMap(() =>
        this.authService.fetchUser().pipe(
          map((user: UserInfo) => UserActions.FetchUserSuccess({ user })),
          catchError((error) => of(UserActions.FetchUserFailed({ error }))),
        ),
      ),
    ),
  );

  clearData$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.ClearData),
        tap(() => { this.authService.logout() }),
      ),
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
  ) { }
}
