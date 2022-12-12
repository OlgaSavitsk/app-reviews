import { AdminComponent } from '@admin/admin.component';
import { inject } from '@angular/core';
import { Route, Router, Routes, UrlSegment } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

import { Path } from './app.constants';
import { PageNotFoundComponent } from './core/pages/page-not-found/page-not-found.component';
import { MainPageComponent } from './main-page/main-page.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  {
    path: 'main',
    component: MainPageComponent,
  },
  {
    path: '',
    loadChildren: () => import('./auth/auth-routing.module').then((m) => m.authroutes),
  },
  {
    path: Path.adminPage,
    component: AdminComponent,
    // canActivate: [
    //   (route: Route, segments: UrlSegment[]) => {
    //     const router = inject(Router);
    //     return inject(AuthService)
    //       .getToken()
    //       .then((isLogged) => {
    //         !!isLogged || router.navigate(['']);
    //       });
    //   },
    // ],
  },
  { path: '**', component: PageNotFoundComponent },
];
