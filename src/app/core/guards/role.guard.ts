import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable, take } from 'rxjs';

import { Path } from 'src/app/app.constants';
import { UserApiService } from '@core/services/user-api.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router, private userService: UserApiService) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userService.getCurrentUser().pipe(
      take(1),
      map((user) =>
        user?.roles === 'admin' ? true : this.router.parseUrl(`${Path.review}/${user?.id}`)
      )
    );
  }
}
