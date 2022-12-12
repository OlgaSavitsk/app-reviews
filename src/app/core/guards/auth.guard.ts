/* import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { AuthService } from '@auth/services/auth.service';
import { Path } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(private router: Router, private authService: AuthService) {}

  canLoad(route: Route, segments: UrlSegment[]) {
    return this.authService.getToken();
  }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isLoggedIn$$.pipe(
      tap((isLoggedIn) => !isLoggedIn && this.router.navigate([Path.adminPage]))
    );
  }
} */
