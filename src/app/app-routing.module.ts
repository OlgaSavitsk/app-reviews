import { AdminComponent } from '@admin/admin.component';
import { Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
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
    loadChildren: () =>
      import('./auth/auth-routing.module').then((m) => m.authroutes),
  },
  {
    path: Path.adminPage,
    loadComponent:() => import('./admin/admin.component').then((c) => c.AdminComponent),
    canActivate: [RoleGuard],
  },
  { path: '**', component: PageNotFoundComponent },
];
