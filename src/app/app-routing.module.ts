import { Routes } from '@angular/router';
import { RoleGuard } from '@core/guards/role.guard';

import { Path } from './app.constants';
import { PageNotFoundComponent } from './core/pages/page-not-found/page-not-found.component';
import { MainPageComponent } from './main-page/main-page.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: Path.loginPage, pathMatch: 'full' },
  {
    path: Path.mainPage,
    component: MainPageComponent,
  },
  {
    path: '',
    loadChildren: () => import('./auth/auth-routing.module').then((m) => m.authroutes),
  },
  {
    path: Path.review,
    loadChildren: () => import('./review/review.routes').then((m) => m.reviewRoutes),
  },
  {
    path: Path.adminPage,
    loadChildren: () => import('@admin/admin.routes').then((m) => m.adminRoutes),
    canActivate: [RoleGuard],
  },
  { path: '**', component: PageNotFoundComponent },
];
