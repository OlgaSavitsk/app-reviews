import { Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { RoleGuard } from '@core/guards/role.guard';

import { PageNotFoundComponent } from '@core/pages/page-not-found/page-not-found.component';
import { Path } from './app.constants';
import { MainPageComponent } from './main-page/main-page.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: Path.mainPage, pathMatch: 'full' },
  {
    path: Path.mainPage,
    component: MainPageComponent,
  },
  {
    path: '',
    loadChildren: () => import('@auth/auth-routing.module').then((m) => m.authroutes),
  },
  {
    path: Path.review,
    loadChildren: () => import('./review/review.routes').then((m) => m.reviewRoutes),
    canActivate: [AuthGuard],
  },
  {
    path: Path.adminPage,
    loadChildren: () => import('@admin/admin.routes').then((m) => m.adminRoutes),
    canActivate: [RoleGuard],
  },
  {
    path: Path.detailsPage,
    loadChildren: () =>
      import('./review-details-page/review-details.routes').then((m) => m.reviewDetailsRoutes),
  },
  { path: '**', component: PageNotFoundComponent },
];
