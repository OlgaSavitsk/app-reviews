import { Injectable } from '@angular/core';
import { catchError, map, tap, of, switchMap, mergeMap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserApiService } from '@core/services/user-api.service';
import { AuthService } from '@auth/services/auth.service';
import * as UserActions from '../actions/user.actions';
import { UserInfo } from '../../models/user.interfaces';

@Injectable()
export class UserEffects {
  fetchUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.FetchUser),
      switchMap(() =>
        this.authService.fetchUser().pipe(
          map((user: UserInfo) => UserActions.FetchUserSuccess({ user })),
          catchError((error) => of(UserActions.FetchUserFailed({ error })))
        )
      )
    );
  });

  getUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.GetUsers),
      switchMap(() =>
        this.userService.getUsers().pipe(
          map((users: UserInfo[]) => UserActions.GetUsersSuccess({ users })),
          catchError((error) => of(UserActions.GetUsersFailed({ error })))
        )
      )
    );
  });

  updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.UpdateUser),
      switchMap(({ user, updateDto }) =>
        this.userService.updateUserStatus(user, updateDto).pipe(
          map((updatedUser: UserInfo) => UserActions.UpdateUserSuccess({ user: updatedUser })),
          catchError((error) => of(UserActions.UpdateUserFailed({ error })))
        )
      )
    );
  });

  deleteUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.DeleteUser),
      mergeMap(({ id }) =>
        this.userService.deleteUser(id).pipe(
          map(() => UserActions.DeleteUserSuccess({ id })),
          catchError((error) => of(UserActions.DeleteUserFailed({ error })))
        )
      )
    );
  });

  clearData$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(UserActions.ClearData),
        tap(() => {
          this.authService.logout();
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private userService: UserApiService
  ) {}
}
