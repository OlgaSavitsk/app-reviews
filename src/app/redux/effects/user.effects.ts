import { Injectable } from '@angular/core';
import { catchError, map, tap, of, switchMap, mergeMap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserApiService } from '@core/services/user-api.service';
import * as UserActions from '../actions/user.actions';
import { UserInfo } from '../../models/user.interfaces';
import { AuthService } from '@auth/services/auth.service';

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

  getUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.GetUsers),
      switchMap(() =>
        this.userService.getUsers().pipe(
          map((users: UserInfo[]) => UserActions.GetUsersSuccess({ users })),
          catchError((error) => of(UserActions.GetUsersFailed({ error }))),
        ),
      ),
    ),
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.UpdateUser),
      switchMap(({user, status}) =>
        this.userService.updateUserStatus(user, status).pipe(
          map((updatedUser: UserInfo) => UserActions.UpdateUserSuccess({ user: updatedUser })),
          catchError((error) => of(UserActions.UpdateUserFailed({ error }))),
        ),
      ),
    ),
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.DeleteUser),
      mergeMap(({id}) =>
        this.userService.deleteUser(id).pipe(
          map(() => UserActions.DeleteUserSuccess({ id: id })),
          catchError((error) => of(UserActions.DeleteUserFailed({ error }))),
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
    private userService: UserApiService
  ) { }
}
